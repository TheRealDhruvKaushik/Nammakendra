import fitz  # PyMuPDF
import os
import tempfile
import requests
from langdetect import detect
import json

def extract_text_from_pdf(file_path):
    """
    Extract text from a PDF file using PyMuPDF
    
    Args:
        file_path: Path to the PDF file
        
    Returns:
        str: Extracted text from the PDF
    """
    try:
        doc = fitz.open(file_path)
        text = ""
        
        for page_num in range(len(doc)):
            page = doc.load_page(page_num)
            text += page.get_text()
            
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {str(e)}")
        raise Exception(f"Failed to extract text from PDF: {str(e)}")

def is_kannada_text(text):
    """
    Detect if text contains primarily Kannada script
    
    Args:
        text: The text to analyze
        
    Returns:
        bool: True if text is primarily in Kannada, False otherwise
    """
    # Simplified detection using script ranges
    kannada_chars = 0
    total_chars = 0
    
    # Kannada Unicode range: 0x0C80-0x0CFF
    for char in text:
        if char.isalpha():
            total_chars += 1
            if 0x0C80 <= ord(char) <= 0x0CFF:
                kannada_chars += 1
    
    # Return True if at least 30% of the characters are Kannada
    return total_chars > 0 and (kannada_chars / total_chars) > 0.3

def detect_language(text):
    """
    Detect the language of text using both script-based detection and langdetect
    
    Args:
        text: Text to detect language
        
    Returns:
        str: 'kannada' or 'english'
    """
    try:
        # First try script-based detection
        if is_kannada_text(text):
            return 'kannada'
        
        # Then use langdetect as a fallback
        try:
            lang = detect(text)
            if lang == 'kn':
                return 'kannada'
            return 'english'  # Default to English for most other languages
        except:
            # If langdetect fails, rely on the script-based detection
            return 'english'
    except Exception as e:
        print(f"Error detecting language: {str(e)}")
        return 'english'  # Default to English on error

def translate_with_indictrans(text, source_lang, target_lang):
    """
    Translate text using IndicTrans2 via Hugging Face Inference API
    
    Args:
        text: Text to translate
        source_lang: Source language ('english' or 'kannada')
        target_lang: Target language ('english' or 'kannada')
        
    Returns:
        str: Translated text
    """
    # Check if translation is needed
    if source_lang == target_lang:
        return text
        
    # Map our language names to IndicTrans2 language codes
    lang_map = {
        'english': 'eng_Latn',
        'kannada': 'kan_Knda'
    }
    
    # Get API token from environment
    api_token = os.environ.get('HUGGING_FACE_TOKEN')
    if not api_token:
        raise Exception("Hugging Face API token is required for translation")
    
    # Format for IndicTrans2
    src = lang_map.get(source_lang, 'eng_Latn')
    tgt = lang_map.get(target_lang, 'kan_Knda')

    # Use the Hugging Face Inference API
    API_URL = "https://api-inference.huggingface.co/models/ai4bharat/indictrans2-indic-indic-1B"
    headers = {"Authorization": f"Bearer {api_token}"}
    
    # Prepare the payload
    payload = {
        "inputs": text,
        "parameters": {
            "src_lang": src,
            "tgt_lang": tgt
        }
    }
    
    try:
        response = requests.post(API_URL, headers=headers, json=payload)
        if response.status_code == 200:
            return response.json()[0]["generated_text"]
        else:
            print(f"Translation error - status code: {response.status_code}")
            print(f"Response content: {response.text}")
            raise Exception(f"Translation API error: {response.status_code}")
    except Exception as e:
        print(f"Error translating text: {str(e)}")
        raise Exception(f"Failed to translate text: {str(e)}")

def process_document(file_path, file_type, user_language='english'):
    """
    Process a document file (PDF or image)
    
    Args:
        file_path: Path to the document file
        file_type: MIME type of the file
        user_language: User's preferred language ('english' or 'kannada')
        
    Returns:
        tuple: (processed_text, detected_language)
    """
    text = ""
    
    # Extract text based on file type
    if file_type == 'application/pdf':
        text = extract_text_from_pdf(file_path)
    elif file_type.startswith('image/'):
        # Image text extraction is handled by the Tesseract implementation in routes.ts
        pass
    else:
        # For plain text and other text-based formats
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()
    
    # Return empty if no text was extracted
    if not text or len(text.strip()) == 0:
        return "", "unknown"
    
    # Detect language
    detected_language = detect_language(text)
    
    return text, detected_language