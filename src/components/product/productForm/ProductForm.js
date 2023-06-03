import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "./ProductForm.css";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct
}) => {
  return (
    <div className='add-product'>
      <div>
        <div className='container'>
        <h3 className='--mt'>Add New Product</h3>
        <form onSubmit={saveProduct}>
        <div className='row'>
        
            <div className='col-md-8'>
                <div className='dashboard-card'>
                <h4 className='--mt'>Product Details</h4>
                <span>Please fill in all details</span>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='form-group'>
                            <label>Product Name:</label>
                              <input type="text" placeholder='Product Name' name="name" className='form-control' 
                              value={product?.name} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                            <label>Product Quantity:</label>
                            <input type="number" placeholder='Quantity'  className='form-control'
                            name="quantity" value={product?.quantity} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                            <label>Product Price:</label>
                            <input type="number" placeholder='Price' className='form-control' 
                              name="price" value={product?.price} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='form-group'>
                            <label>Order Note:</label>
                            <textarea name='orderNote' placeholder='Order Note' row="3" className='form-control' 
                            value={product?.orderNote} onChange={handleInputChange}>
                            </textarea>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='form-group'>
                            <label >Product Description:</label>
                          <ReactQuill theme="snow" value={description}
                          onChange={setDescription} modules={ProductForm.modules} formats={ProductForm.formats} />
                            </div>
                        </div>
                        

                    </div>
                </div>
            </div>

            <div className='col-md-4'>
                <div className='dashboard-card'>
                  <br/>
                <h4 className='--mt'>Product Image</h4>
                <code className='--color-dark'>Supported Formats: jpg, jpeg</code>
                    <div className='row'>
                        <div className='col-md-12'>
                              <div className='form-group'>
                                  <input type="file" name="image" 
                                    onChange={(e) => handleImageChange(e)} />
                            </div>
                              {imagePreview != null ? (
                                <div className='image-preview'>
                                  <img src={imagePreview} alt="product" />
                                </div>
                              ) : (<p>Please provide an image</p>)}
                        </div>
                           
                    </div>
                </div>
            </div>
            <div className='col-md-12'>
                              <div className='--my'>
                                    <button type='submit' className='btn btn-primary'>
                                      Save Product
                                    </button>
                              </div>
                        </div>
            

        </div>
        </form>
        </div>
      
      </div>
    </div>
  )
}

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm
