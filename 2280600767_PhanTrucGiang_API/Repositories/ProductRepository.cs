﻿using Microsoft.EntityFrameworkCore;
using _2280600767_PhanTrucGiang_API.Data;
using _2280600767_PhanTrucGiang_API.Models;

namespace _2280600767_PhanTrucGiang_API.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly GiangDbContext _context;

        public ProductRepository(GiangDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task AddProductAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateProductAsync(Product product)
        {
            _context.Entry(product).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                await _context.SaveChangesAsync();
            }
        }
    }
}