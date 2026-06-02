import joi from 'joi';

export const todoSchema = joi.object({
  title: joi.string().required().trim().max(200),
  description: joi.string().optional().trim(),
  completed: joi.boolean().optional()
});

export const orderSchema = joi.object({
  customerId: joi.string().required().trim(),
  items: joi.array().items(
    joi.object({
      productId: joi.string().required(),
      quantity: joi.number().required().min(1)
    })
  ).required(),
  totalAmount: joi.number().optional()
});

export const inventorySchema = joi.object({
  sku: joi.string().required().uppercase(),
  name: joi.string().required().trim(),
  quantity: joi.number().required().min(0)
});

export const supplierSchema = joi.object({
  name: joi.string().required().trim(),
  contactEmail: joi.string().email().required(),
  phone: joi.string().optional().trim()
});

export const updateInventorySchema = joi.object({
  sku: joi.string().optional().uppercase(),
  name: joi.string().optional().trim(),
  quantity: joi.number().optional().min(0)
});

export const updateSupplierSchema = joi.object({
  name: joi.string().optional().trim(),
  contactEmail: joi.string().email().optional(),
  phone: joi.string().optional().trim()
});

export const updateTodoSchema = joi.object({
  title: joi.string().optional().trim().max(200),
  description: joi.string().optional().trim(),
  completed: joi.boolean().optional()
});
