# Document Extraction Pipeline

A simple document extraction pipeline built with Deno that extracts text content
from various document formats and saves them as text files.

## Features

- 📁 **Batch Processing**: Process all files in the input directory
  automatically
- ⚡ **Duplicate Detection**: Skip files that have already been extracted
- 🚀 **[Deno Native](https://deno.com/)**: Built using Deno runtime and standard library features
- 🔧 **[Apache Tika](https://tika.apache.org/) Integration**: Supports multiple document formats (PDF, DOC,
  DOCX, etc.)

## Project Structure

```
├── extractor.ts        # Document extraction logic
├── main.ts             # Main application entry point
├── input/              # Input directory for documents (auto-created)
├── output/             # Output directory for extracted text (auto-created)
└── README.md           # This file
```

## Usage

1. **Place documents in the input directory:**
   ```bash
   mkdir input
   cp your-documents/* ./input/
   ```

2. **Run the extraction pipeline:**
   ```bash
   deno task dev
   ```

   Or run directly:
   ```bash
   deno run -A main.ts
   ```

3. **Check the extracted text files in the output directory:**
   ```bash
   ls output/
   ```

## How it Works

1. The application reads all files from the `./input` directory
2. For each file, it checks if a corresponding `.txt` file already exists in
   `./output`
3. If the file hasn't been processed, it extracts the text using Apache Tika
4. The extracted text is cleaned (normalized whitespace) and saved as a `.txt`
   file
5. Files that have already been processed are automatically skipped

## Supported File Formats

The pipeline uses [Apache Tika and supports](https://tika.apache.org/3.2.1/formats.html):

- PDF documents
- Microsoft Word (DOC, DOCX)
- Microsoft Excel (XLS, XLSX)
- Microsoft PowerPoint (PPT, PPTX)
- OpenDocument formats (ODT, ODS, ODP)
- Rich Text Format (RTF)
- Plain text files
- And many more formats supported by Apache Tika

## Output Format

Extracted text files are saved with the following naming convention:

- Input: `document.pdf` → Output: `document.txt`
- Input: `report.docx` → Output: `report.txt`

The extracted text is cleaned by:

- Normalizing whitespace
- Removing excessive line breaks
- Trimming leading/trailing spaces

## Example

```bash
# Place some documents
mkdir input
cp ~/Documents/*.pdf ./input/

# Run extraction
deno task dev

# Output:
# 📄 Document Extraction Pipeline Starting...
#    Input: ./input
#    Output: ./output
# 📄 Extracting document1.pdf...
# ✅ Extracted document1.pdf → document1.txt
# 📄 Extracting document2.pdf...
# ✅ Extracted document2.pdf → document2.txt
# 🎉 Document extraction pipeline completed!

# Check results
ls output/
# document1.txt  document2.txt
```

## Dependencies

The project uses:

- `@ax-llm/ax` for Apache Tika integration
- Deno standard library for file system operations and path utilities
