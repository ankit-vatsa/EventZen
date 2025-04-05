using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VendorManagementAPI.Data;
using VendorManagementAPI.Models;

namespace VendorManagementAPI.Controllers
{
	[Route("api/event-vendors")]
	[ApiController]
	public class EventVendorController : ControllerBase
	{
		private readonly AppDbContext _context;

		public EventVendorController(AppDbContext context)
		{
			_context = context;
		}

		// Get all event-vendor links
		[HttpGet]
		public async Task<ActionResult<IEnumerable<EventVendor>>> GetEventVendors()
		{
			return await _context.EventVendors.Include(ev => ev.Vendor).ToListAsync();
		}

		// Link a vendor to an event
		[HttpPost]
		public async Task<ActionResult<EventVendor>> CreateEventVendor(EventVendor eventVendor)
		{
			_context.EventVendors.Add(eventVendor);
			await _context.SaveChangesAsync();
			return CreatedAtAction(nameof(GetEventVendors), new { id = eventVendor.Id }, eventVendor);
		}

		// Unlink a vendor from an event
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteEventVendor(int id)
		{
			var eventVendor = await _context.EventVendors.FindAsync(id);
			if (eventVendor == null) return NotFound();

			_context.EventVendors.Remove(eventVendor);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
