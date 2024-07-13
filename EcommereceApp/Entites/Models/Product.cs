namespace EcommereceApp.Entites.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Brand { get; set; }
        public int ProductCode { get; set; }
        public string ProductDescription { get; set; }
        public decimal Price { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public List<CartItem> CartItems { get; set; }
        public List<OrderItem> OrderItems { get; set; }
        public string ImgUrl { get; set; }
    }














}
