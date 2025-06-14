# Product API

A RESTful API for managing products, built with Express and MongoDB.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- npm

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd week-2-express-js-assignment-ambagwa
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and fill in your values.

4. Start the server:
   ```
   npm start
   ```
   The server will run on the port specified in your `.env` file (default: 3000).

## Environment Variables

See `.env.example` for required variables.

## API Endpoints

### Authentication

All endpoints require an `x-api-key` header with a valid API key.

---

### GET `/api/products`

Retrieve a list of products.

**Query Parameters:**
- `category` (optional): Filter by category.
- `page` (optional): Page number for pagination.
- `limit` (optional): Number of products per page.

**Example Request:**
```
GET /api/products?category=electronics&page=1&limit=5
x-api-key: your-api-key
```

**Example Response:**
```json
{
  "page": 1,
  "limit": 5,
  "total": 12,
  "totalPages": 3,
  "products": [
    {
      "_id": "123",
      "name": "Phone",
      "category": "electronics",
      "price": 299.99,
      "description": "A smartphone"
    }
  ]
}
```

---

### GET `/api/products/search?name=phone`

Search for products by name (case-insensitive).

**Example Request:**
```
GET /api/products/search?name=phone
x-api-key: your-api-key
```

**Example Response:**
```json
[
  {
    "_id": "123",
    "name": "Phone",
    "category": "electronics",
    "price": 299.99,
    "description": "A smartphone"
  }
]
```

---

### GET `/api/products/:id`

Get a single product by ID.

---

### POST `/api/products`

Create a new product.

**Body:**
```json
{
  "name": "Laptop",
  "category": "electronics",
  "price": 999.99,
  "description": "A powerful laptop"
}
```

---

### PUT `/api/products/:id`

Update an existing product.

**Body:** Same as POST.

---

### DELETE `/api/products/:id`

Delete a product by ID.

---

## Error Handling

Errors are returned in JSON format with appropriate HTTP status codes.

**Example:**
```json
{
  "error": "Product not found"
}
```

---

## Logging

All requests are logged with method, URL, and timestamp.

---

## Validation

Product creation and update requests are validated for required fields.

---

## Example `.env.example`

```
MONGODB_URI=mongodb://localhost:27017/productsdb
PORT=3000
API_KEY=your-api-key
```