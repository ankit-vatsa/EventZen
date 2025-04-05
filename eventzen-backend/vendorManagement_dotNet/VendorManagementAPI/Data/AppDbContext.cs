using Microsoft.EntityFrameworkCore;
using VendorManagementAPI.Models;

namespace VendorManagementAPI.Data
{
	public class AppDbContext : DbContext
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

		public DbSet<Vendor> Vendors { get; set; }
		public DbSet<EventVendor> EventVendors { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<EventVendor>()
						.ToTable("event_vendors")  // Explicitly specify the table name

		// Explicitly map the properties to the correct column names
		.Property(ev => ev.Id).HasColumnName("id");
			modelBuilder.Entity<EventVendor>()
				.Property(ev => ev.EventId).HasColumnName("event_id");
			modelBuilder.Entity<EventVendor>()
				.Property(ev => ev.VendorId).HasColumnName("vendor_id");

			modelBuilder.Entity<EventVendor>()
				.HasOne(ev => ev.Vendor)
				.WithMany()
				.HasForeignKey(ev => ev.VendorId);
			//.ToTable("event_vendors")
			//.HasOne(ev => ev.Vendor)
			//.WithMany()
			//.HasForeignKey(ev => ev.VendorId);
			modelBuilder.Entity<Vendor>()
		.ToTable("vendors")  // Explicitly specify the table name
		.Property(v => v.ContactInfo)
		.HasColumnName("contact_info");  // Map property to the correct column name

			// Add mappings for other properties if needed
			modelBuilder.Entity<Vendor>()
				.Property(v => v.Name)
				.HasColumnName("name");

			modelBuilder.Entity<Vendor>()
				.Property(v => v.ServiceType)
				.HasColumnName("service_type");
		}
	}
}
