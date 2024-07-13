using System.ComponentModel.DataAnnotations;

namespace EcommereceApp.Entites.DTOs.UserDto
{
    public class UpdateUserDto
    {
        public string Name { get; set; }
        [Required]
        [EmailAddress]
        [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }
        [Required]
        [StringLength(10)]
        [RegularExpression(@"^[6-9]\d{9}$", ErrorMessage = "Invalid phone number.")]
        public string Phone { get; set; }
        public string City { get; set; }
    }
}
