using EcommereceApp.Entites.DTOs.ProductDto;

namespace EcommereceApp.Entites.DTOs.CategoryDto
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public List<ResponseProductDto> Products { get; set; }
    }
}
