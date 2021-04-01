# Getting started with Textract

A deeplearning OCR service by AWS for application developers to extract text from documents. Amazon Textract includes simple, easy-to-use APIs that can analyze image files and PDF files. Amazon Textract is always learning from new data, and we’re continually adding new features to the service.

## Detecting Text

#### What API's to use to detect text synchronously?
Amazon Textract provides synchronous operations for processing small, single-page, documents and for getting near real-time responses. To detect text synchronously, use the **DetectDocumentText** API operation. 

#### What API's to use to detect text Asynchronously?
Amazon Textract also provides asynchronous operations that you can use to process larger, multipage documents. To detect text asynchronously, use **StartDocumentTextDetection** to start processing an input document file. To get the results, call **GetDocumentTextDetection**. The results are returned in one or more responses from **GetDocumentTextDetection**. 

## Analyzing Text
Amazon Textract analysis operations (API's) return 3 categories of text extraction,

  - TEXT: The raw text extracted from a document, with lines and word blocks. 
  
  - FORMS: Form data is linked text items, Amazon Textract represents form data as key-value pairs. Key-value pairs are also used to represent check boxes or option buttons (radio buttons).
  
  - TABLES: Amazon Textract can extract tables, table cells, and the items within table cells.

#### What API's to use to analys text synchronously?
To analyze text synchronously, use the **AnalyzeDocument** operation, and pass a document as input. **AnalyzeDocument** returns the entire set of results. 

#### What API's to use to analys text asynchronously?
- You can identify relationships between detected text on a multipage document. The asynchronous operations are **StartDocumentAnalysis** and **GetDocumentAnalysis**. 

- **NOTE**: To specify which type of analysis to perform, you can use the `FeatureTypes` list input parameter in the request. Detected text will be in anyway in the response, even though we didn't mention in the `FeatureTypes`.
  - **TABLES**: Add `TABLES` to the list to return information about the tables that are detected in the input document, for example, table cells, cell text, and selection elements in cells. 
  - **FORMS**: Add `FORMS` to return word relationships, such as key-value pairs and selection elements. 


## Documents and It's Limits in Textract

- Synchronous operations can process JPEG and PNG format images.

- In Asynchronous operations, **Multipage documents must be in PDF format**. Single-page documents processed with asynchronous operations can be in JPEG, PNG, or PDF format.

- Limits in Amazon Textract
  - maximum image (JPEG/PNG) size is **5 MB**.
  - maximum PDF file size is **500 MB**.
  - maximum number of pages in a PDF file is **3000**.
  - The minimum height for text to be detected is **15 pixels**. (At 150 DPI, this would be equivalent to 8-pt font.)
  - Amazon Textract doesn't support the **detection of handwriting**.

- How to pass documents as input
  - Synchronous: input documents that are stored in an Amazon S3 bucket, or you can pass **base64-encoded** image bytes.
  - Aynchronous: you need to supply input documents in an Amazon S3 bucket.

## Block Object in response
When an Amazon Textract operation processes a document, the results are returned in an array of Block objects. A **Block object** contains information that's detected about items, including their location on the document and their relationship to other items on the document. 

kind of informations in the response's block section,
- The lines and words of detected text

- The relationships between the lines and words of detected text

- The page that the detected text appears on

- The location of the lines and words of text on the document page

example, 
```json
{
  "DocumentMetadata": {
    "Pages": 1
  },
  "Blocks": [
    {
        "BlockType": "LINE",
        "Confidence": 99.97847747802734,
        "Text": "INVOICE",
        "Geometry": {
        "BoundingBox": {
            "Width": 0.08157581090927124,
            "Height": 0.012953739613294601,
            "Left": 0.5718449950218201,
            "Top": 0.038218311965465546
        },
        "Polygon": [
            {
            "X": 0.5718449950218201,
            "Y": 0.038218311965465546
            },
            {
            "X": 0.6534208059310913,
            "Y": 0.038218311965465546
            },
            {
            "X": 0.6534208059310913,
            "Y": 0.05117205157876015
            },
            {
            "X": 0.5718449950218201,
            "Y": 0.05117205157876015
            }
        ]
        },
        "Id": "0ecdf248-f1d2-4011-901a-3cf1e4dcb674",
        "Relationships": [
        {
            "Type": "CHILD",
            "Ids": [
                "bbe4f5ef-a92f-4a9a-af48-a69961bec84a"
            ]
        }
        ]
    }
  ]
}
```
#### Contents in block objects
## BlockType

- Pages

  - A `PAGE` block object contains a list of the `Child ID`s for the lines of **Text**, **key-value pairs**, and **Tables** that are detected on the document page.
  
  - With a multipage document that's in PDF format, you can determine the page that a block is located on by inspecting the `Page field` of the Block object.
    - Asynchronous operations always return a Page value of 1 for scanned images. 
    - Synchronous operations don't include the Page field, because they only process a scanned image (always a single-page document).
```json
{
    "Geometry": .... 
    "Relationships": [
        {
            "Type": "CHILD", 
            "Ids": [
                "2602b0a6-20e3-4e6e-9e46-3be57fd0844b", Line - Hello, world.
                "82aedd57-187f-43dd-9eb1-4f312ca30042", Line - How are you?
            ]
        }
    ], 
    "BlockType": "PAGE", 
    "Id": "8136b2dc-37c1-4300-a9da-6ed8b276ea97"
}
```
<br>

- Lines and words of text
    -  A **LINE** is a string of **tab-delimited**.
    - Detected text is returned in the `Text field` of a Block object.
    - To detect only lines and words, you can use **DetectDocumentText** or **StartDocumentTextDetection**. 
    - To get the detected text (lines and words) and information about how it relates to other parts of the document, such as tables, you can use **AnalyzeDocument** or **StartDocumentAnalysis**.

```json
// line
{
    "Relationships": [
        {
            "Type": "CHILD", 
            "Ids": [
                "7f97e2ca-063e-47a8-981c-8beee31afc01", Word - Hello,
                "4b990aa0-af96-4369-b90f-dbe02538ed21"  Word - world.
            ]
        }
    ], 
    "Confidence": 99.63229370117188, 
    "Geometry": {...}, 
    "Text": "Hello, world.", 
    "BlockType": "LINE", 
    "Id": "d7fbd604-d609-4d69-857d-247a3f591238"
},
```

```json
// word
{
    "Geometry": {...}, 
    "Text": "Hello,", 
    "BlockType": "WORD", 
    "Confidence": 99.74746704101562, 
    "Id": "7f97e2ca-063e-47a8-981c-8beee31afc01"
}, 
```
<br>

- Form data (Key-value pairs)
    - key-value pairs are returned as Block objects in the responses from **AnalyzeDocument** and **GetDocumentAnalysis**, when you use FeatureTypes input parameter as `FORMS`.
    - Block objects with the block type `KEY_VALUE_SET` are the containers for `KEY` or `VALUE` Block objects.
      - A KEY block has two relationship lists. A relationship of type VALUE is a list that contains the ID of the VALUE block that's associated with the key.
      - A VALUE block has a relationship with a list of CHILD blocks that identify WORD blocks.
        -  A VALUE object can also contain information about selected elements.

![](https://docs.aws.amazon.com/textract/latest/dg/images/hieroglyph-key-value-set.png)

<br>

```json
// Page level response
{
    "Geometry": .... 
    "Relationships": [
        {
            "Type": "CHILD", 
            "Ids": [
                "2602b0a6-20e3-4e6e-9e46-3be57fd0844b", 
                "82aedd57-187f-43dd-9eb1-4f312ca30042", 
                "52be1777-53f7-42f6-a7cf-6d09bdc15a30", // Key - Name:
                "7ca7caa6-00ef-4cda-b1aa-5571dfed1a7c"  // Value - Ana Caroline 
            ]
        }
    ], 
    "BlockType": "PAGE", 
    "Id": "8136b2dc-37c1-4300-a9da-6ed8b276ea97"  // Page identifier
},
```
<br>

- KEY block (52be1777-53f7-42f6-a7cf-6d09bdc15a30) 
  - has a relationship with the VALUE block (7ca7caa6-00ef-4cda-b1aa-5571dfed1a7c). 
  - It also has a CHILD block for the WORD block (c734fca6-c4c4-415c-b6c1-30f7510b72ee) that contains the text for the key (Name:).

<br>

```json
{
    "Relationships": [
        {
            "Type": "VALUE", 
            "Ids": [
                "7ca7caa6-00ef-4cda-b1aa-5571dfed1a7c"  // Value identifier
            ]
        }, 
        {
            "Type": "CHILD", 
            "Ids": [
                "c734fca6-c4c4-415c-b6c1-30f7510b72ee"  // Name:
            ]
        }
    ], 
    "Confidence": 51.55965805053711, 
    "Geometry": ...., 
    "BlockType": "KEY_VALUE_SET", 
    "EntityTypes": [
        "KEY"
    ], 
    "Id": "52be1777-53f7-42f6-a7cf-6d09bdc15a30"  //Key identifier
},
```

<br>

- VALUE block 7ca7caa6-00ef-4cda-b1aa-5571dfed1a7c has a CHILD list of IDs for the WORD blocks that make up the text of the value (Ana and Carolina).

<br>

```json
{
    "Relationships": [
        {
            "Type": "CHILD", 
            "Ids": [
                "db553509-64ef-4ecf-ad3c-bea62cc1cd8a", // Ana
                "e5d7646c-eaa2-413a-95ad-f4ae19f53ef3"  // Carolina
            ]
        }
    ], 
    "Confidence": 51.55965805053711, 
    "Geometry": ...., 
    "BlockType": "KEY_VALUE_SET", 
    "EntityTypes": [
        "VALUE"
    ], 
    "Id": "7ca7caa6-00ef-4cda-b1aa-5571dfed1a7c" // Value identifier
}
```
<br>

- Tables
    - Detected tables are returned as Block objects in the responses from AnalyzeDocument and GetDocumentAnalysis.
      - You can use `TABLES`for the FeatureTypes input parameter

<br>
Example

![](https://docs.aws.amazon.com/textract/latest/dg/images/simpletable.png)

<br>

![](https://docs.aws.amazon.com/textract/latest/dg/images/hieroglyph-table-cell.png)

<br>

#### JSON for this table in response

- Page Level

    - PAGE Block object has a list of CHILD Block IDs for the TABLE block and each LINE of text that's detected.

```json
{
    "Geometry": {...}, 
    "Relationships": [
        {
            "Type": "CHILD", 
            "Ids": [
                "f2a4ad7b-f21d-4966-b548-c859b84f66a4",   // Line - Name
                "4dce3516-ffeb-45e0-92a2-60770e9cb744",   // Line  - Address 
                "ee506578-768f-4696-8f4b-e4917e429f50",   // Line - Ana Silva
                "33fc7223-411b-4399-8a90-ccd3c5a2c196",   // Line  - 123 Any Town
                "3f9665be-379d-4ae7-be44-d02f32b049c2"    // Table
            ]
        }
    ], 
    "BlockType": "PAGE", 
    "Id": "78c3ce84-ae70-418e-add7-27058418adf6"
}, 
```

<br>

- Table Block
  
    - The TABLE block includes a list of child IDs for the cells within the table.
      - The following JSON shows that the table has four cells, which are listed in the Ids array.

```json
{
    "Geometry": {...}, 
    "Relationships": [
        {
            "Type": "CHILD", 
            "Ids": [
                "505e9581-0d1c-42fb-a214-6ff736822e8c", 
                "6fca44d4-d3d3-46ab-b22f-7fca1fbaaf02", 
                "9778bd78-f3fe-4ae1-9b78-e6d29b89e5e9", 
                "55404b05-ae12-4159-9003-92b7c129532e"
            ]
        }
    ], 
    "BlockType": "TABLE", 
    "Confidence": 92.5705337524414, 
    "Id": "3f9665be-379d-4ae7-be44-d02f32b049c2"
}, 
```
<br>

- Cell Block
    - The Block type for the table cells is CELL. 
      - The Block object for each cell includes information about the cell location compared to other cells in the table. 
        - With rowindex, colindex(1, 1 means first row and cell, which is `Name`)
        - rowspan, colspan means, size of the column, respect to small col and row.
        - The child list contains the IDs for the WORD Block objects that contain the text that's within the cell.

```json
{
    "Geometry": {...}, 
    "Relationships": [
        {
            "Type": "CHILD", 
            "Ids": [
                "e9108c8e-0167-4482-989e-8b6cd3c3653e"
            ]
        }
    ], 
    "Confidence": 100.0, 
    "RowSpan": 1, 
    "RowIndex": 1, 
    "ColumnIndex": 1, 
    "ColumnSpan": 1, 
    "BlockType": "CELL", 
    "Id": "505e9581-0d1c-42fb-a214-6ff736822e8c"
}, 
```
<br>



- Selection elements
  - Selection elements can be detected in form data and in tables.
  - Option buttons (radio buttons) and check boxes on a document page. 

![](https://docs.aws.amazon.com/textract/latest/dg/images/checkbox.png)

  - Information about a selection element is contained in a Block object of type SELECTION_ELEMENT. 
    - To determine the status of a selectable element, use the SelectionStatus field of the SELECTION_ELEMENT block.  The status can be either SELECTED or NOT_SELECTED. 


  - A SELECTION_ELEMENT Block object isn't a child of a PAGE Block object.
  - Selection with Form Data
    - The VALUE block contains the SELECTION_ELEMENT block. 

![](https://docs.aws.amazon.com/textract/latest/dg/images/hieroglyph-key-value-set-selectable.png)

  - #### Value Block

```json
{
    "Relationships": [
        {
            "Type": "CHILD", 
            "Ids": [
                "f2f5e8cd-e73a-4e99-a095-053acd3b6bfb"  //Selection element
            ]
        }
    ], 
    "Confidence": 94.15619659423828, 
    "Geometry": {
        "BoundingBox": {
            "Width": 0.017281491309404373, 
            "Top": 0.07643391191959381, 
            "Left": 0.2271782010793686, 
            "Height": 0.026274094358086586
        }, 
        "Polygon": [
            {
                "Y": 0.07643391191959381, 
                "X": 0.2271782010793686
            }, 
            {
                "Y": 0.07643391191959381, 
                "X": 0.24445968866348267
            }, 
            {
                "Y": 0.10270800441503525, 
                "X": 0.24445968866348267
            }, 
            {
                "Y": 0.10270800441503525, 
                "X": 0.2271782010793686
            }
        ]
    }, 
    "BlockType": "KEY_VALUE_SET", 
    "EntityTypes": [
        "VALUE"
    ], 
    "Id": "24aaac7f-fcce-49c7-a4f0-3688b05586d4"
}, 
```

  - #### Selection Element Block

```json
{
    "Geometry": {
        "BoundingBox": {
            "Width": 0.020316146314144135, 
            "Top": 0.07575977593660355, 
            "Left": 0.22590067982673645, 
            "Height": 0.027631107717752457
        }, 
        "Polygon": [
            {
                "Y": 0.07575977593660355, 
                "X": 0.22590067982673645
            }, 
            {
                "Y": 0.07575977593660355, 
                "X": 0.2462168186903
            }, 
            {
                "Y": 0.1033908873796463, 
                "X": 0.2462168186903
            }, 
            {
                "Y": 0.1033908873796463, 
                "X": 0.22590067982673645
            }
        ]
    }, 
    "BlockType": "SELECTION_ELEMENT", 
    "SelectionStatus": "NOT_SELECTED", 
    "Confidence": 74.14942932128906, 
    "Id": "f2f5e8cd-e73a-4e99-a095-053acd3b6bfb"
}
```
- Same can be applied to Table cell aswell.

## Geometry
  -  The Geometry object contains two types of location and geometric information for detected items:
     -  An axis-aligned BoundingBox object that contains the top-left coordinate and the width and height of the item. 
        -  BoundingBox property has a value between 0 and 1. The value is a ratio of the overall image
           -   For example, if the input image is 700 x 200 pixels, and the top-left coordinate of the bounding box is (350,50) pixels, the API returns a Left value of 0.5 (350/700) and a Top value of 0.25 (50/200).

        -  Height – The height of the bounding box as a ratio of the overall document page height.
        -  Left – The X coordinate of the top-left point of the bounding box as a ratio of the overall document page width.
        -  Top – The Y coordinate of the top-left point of the bounding box as a ratio of the overall document page width.
        -  Width – The width of the bounding box as a ratio of the overall document page width.

     -  A polygon object that describes the outline of the item, specified as an array of Point objects that contain X (horizontal axis) and Y (vertical axis) document page coordinates of each point.

```json
{
    "Geometry": {
        "BoundingBox": {
            "Width": 0.053907789289951324, 
            "Top": 0.08913730084896088, 
            "Left": 0.11085548996925354, 
            "Height": 0.013171200640499592
        }, 
        "Polygon": [
            {
                "Y": 0.08985357731580734, 
                "X": 0.11085548996925354
            }, 
            {
                "Y": 0.08913730084896088, 
                "X": 0.16447919607162476
            }, 
            {
                "Y": 0.10159222036600113, 
                "X": 0.16476328670978546
            }, 
            {
                "Y": 0.10230850428342819, 
                "X": 0.11113958805799484
            }
        ]
    }, 
    "Text": "Name:", 
    "BlockType": "WORD", 
    "Confidence": 99.56285858154297, 
    "Id": "c734fca6-c4c4-415c-b6c1-30f7510b72ee"
},
```

## Getting started with AWS Textract
https://docs.aws.amazon.com/textract/latest/dg/getting-started.html


