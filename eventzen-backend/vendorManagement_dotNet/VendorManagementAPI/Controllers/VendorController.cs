using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VendorManagementAPI.Data;
using VendorManagementAPI.Models;

namespace VendorManagementAPI.Controllers
{
	[Route("api/vendors")]
	[ApiController]
	public class VendorController : ControllerBase
	{
		private readonly AppDbContext _context;

		public VendorController(AppDbContext context)
		{
			_context = context;
		}

		// Get all vendors
		[HttpGet]
		public async Task<ActionResult<IEnumerable<Vendor>>> GetVendors()
		{
			return await _context.Vendors.ToListAsync();
		}

		// Get vendor by ID
		[HttpGet("{id}")]
		public async Task<ActionResult<Vendor>> GetVendor(int id)
		{
			var vendor = await _context.Vendors.FindAsync(id);
			if (vendor == null) return NotFound();
			return vendor;
		}

		// Create a vendor
		[HttpPost]
		public async Task<ActionResult<Vendor>> CreateVendor(Vendor vendor)
		{
			_context.Vendors.Add(vendor);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(GetVendor), new { id = vendor.Id }, vendor);
		}

		// Update a vendor
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateVendor(int id, Vendor vendor)
		{
			if (id != vendor.Id) return BadRequest();

			_context.Entry(vendor).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			return NoContent();
		}

		// Delete a vendor
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteVendor(int id)
		{
			var vendor = await _context.Vendors.FindAsync(id);
			if (vendor == null) return NotFound();

			_context.Vendors.Remove(vendor);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
