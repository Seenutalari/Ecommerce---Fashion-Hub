using System.ComponentModel.DataAnnotations;

namespace EcommereceApp.Entites.DTOs.ProductDto
{
    public class RequestProductDto
    {
        [Required]
        public string Brand { get; set; }
        [Required]
        public int ProductCode { get; set; }
        [Required]
        public string ProductDescription { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public string ImgUrl { get; set; }
    }
}
