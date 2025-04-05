using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace VendorManagementAPI.Models
{
	public class EventVendor
	{
		[Key]
		public int Id { get; set; }

		[Required]
		public int EventId { get; set; }

		[Required]
		public int VendorId { get; set; }

		[ForeignKey("VendorId")]
		public Vendor? Vendor { get; set; }
	}
}
