using System.ComponentModel.DataAnnotations;

namespace VendorManagementAPI.Models
{
	public class Vendor
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public string Name { get; set; } = string.Empty;

		[Required]
		public string ServiceType { get; set; } = string.Empty;

		[Required]
		public string ContactInfo { get; set; } = string.Empty;
	}
}
