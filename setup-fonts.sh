#!/bin/bash
# Font Setup Script for Prompt.Fail
# This script downloads, converts, and organizes fonts for the prompt.fail website

# Create necessary directories
mkdir -p prompt-fail/fonts
mkdir -p temp_fonts

# Function to download and extract Google Font
download_font() {
  local font_name=$1
  local font_url=$2
  local output_dir="temp_fonts/${font_name}"
  
  echo "Downloading ${font_name}..."
  
  # Download font zip file
  curl -L "${font_url}" -o "temp_fonts/${font_name}.zip"
  
  # Create directory for extracted files
  mkdir -p "${output_dir}"
  
  # Extract zip file
  unzip -q "temp_fonts/${font_name}.zip" -d "${output_dir}"
  
  echo "${font_name} downloaded and extracted"
}

# Download fonts
download_font "ebgaramond" "https://fonts.google.com/download?family=EB%20Garamond"
download_font "spacegrotesk" "https://fonts.google.com/download?family=Space%20Grotesk"
download_font "sourceserifpro" "https://fonts.google.com/download?family=Source%20Serif%20Pro"

echo "All fonts downloaded"

# Check if fonttools is installed for font conversion
if ! command -v fonttools &> /dev/null; then
  echo "fonttools not found, attempting to install with pip..."
  pip install fonttools brotli zopfli
fi

# Function to convert TTF to WOFF and WOFF2
convert_font() {
  local input_font=$1
  local output_name=$2
  
  echo "Converting ${input_font} to WOFF and WOFF2..."
  
  # Convert to WOFF
  fonttools ttLib.woff --flavor=woff --output="prompt-fail/fonts/${output_name}.woff" "${input_font}"
  
  # Convert to WOFF2
  fonttools ttLib.woff --flavor=woff2 --output="prompt-fail/fonts/${output_name}.woff2" "${input_font}"
  
  echo "Converted ${output_name}"
}

# Find and convert the required fonts
# EB Garamond Regular
ebgaramond_regular=$(find temp_fonts/ebgaramond -name "*-Regular.ttf" | head -n 1)
convert_font "${ebgaramond_regular}" "ebgaramond-regular"

# Space Grotesk Medium
spacegrotesk_medium=$(find temp_fonts/spacegrotesk -name "*-Medium.ttf" | head -n 1)
convert_font "${spacegrotesk_medium}" "spacegrotesk-medium"

# Space Grotesk Bold
spacegrotesk_bold=$(find temp_fonts/spacegrotesk -name "*-Bold.ttf" | head -n 1)
convert_font "${spacegrotesk_bold}" "spacegrotesk-bold"

# Source Serif Pro Regular
sourceserifpro_regular=$(find temp_fonts/sourceserifpro -name "*-Regular.ttf" | head -n 1)
convert_font "${sourceserifpro_regular}" "sourceserifpro-regular"

# Source Serif Pro Bold
sourceserifpro_bold=$(find temp_fonts/sourceserifpro -name "*-Bold.ttf" | head -n 1)
convert_font "${sourceserifpro_bold}" "sourceserifpro-bold"

# Clean up temporary files
echo "Cleaning up temporary files..."
rm -rf temp_fonts

echo "Font setup complete! All font files are in prompt-fail/fonts/"
echo "Next steps:"
echo "1. Update styles.css and index.html with the new font references"
echo "2. Test font rendering in different browsers"
echo "3. Commit changes to Git repository"