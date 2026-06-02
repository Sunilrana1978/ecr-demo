import { ValidationError } from '@shared/errors';

export function validate(schema) {
  return async (req, res, next) => {
    try {
      const { error, value } = schema.validate(req.body, { abortEarly: false });

      if (error) {
        const details = error.details.map(d => ({
          field: d.path.join('.'),
          message: d.message
        }));
        throw new ValidationError('Validation failed', details);
      }

      req.validatedBody = value;
      next();
    } catch (err) {
      next(err);
    }
  };
}
