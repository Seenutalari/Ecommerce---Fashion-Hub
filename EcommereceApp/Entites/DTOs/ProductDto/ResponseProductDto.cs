namespace EcommereceApp.Entites.DTOs.ProductDto
{
    public class ResponseProductDto
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public int ProductCode { get; set; }
        public string ProductDescription { get; set; }
        public decimal Price { get; set; }
        public string ImgUrl { get; set; }

    }
}
