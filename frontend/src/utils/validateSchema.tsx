import { validationError } from '@/types/validation.type';
import { ZodSchema } from 'zod';

/**
 * This function takes in a data object and a zod schema, and uses the schema to
 * validate the data.
 *
 * If the validation is successful, the function returns null. Otherwise, it returns
 * an object with the error messages grouped by field name.
 *
 * The error messages are obtained from the `flatten` method of the `ZodError`
 * instance returned by the `safeParse` method of the zod schema. The `flatten`
 * method returns an object where each key is a field name and the value is an
 * array of error messages for that field.
 *
 * @example
 * const schema = z.object({ name: z.string().min(2), email: z.string().email() });
 * const data = { name: 'John Doe', email: 'johndoe@example.com' };
 * validateData(data, schema); // Returns null
 *
 * const invalidData = { name: 'John', email: 'johndoe' };
 * validateData(invalidData, schema); // Returns { errors: { name: [{ message: 'min length is 2' }], email: [{ message: 'invalid email' }] } }
 */
const validateData = <T extends object, S extends ZodSchema>(
  data: T,
  schema: S
): null | { errors: validationError } => {
  const validation = schema.safeParse(data);
  const errors = validation.success ? [] : processErrors(formatErrors(validation.error.errors));
  /* If the validation is successful, the function returns null. Otherwise, it returns an object with the errors that contain the field names 
  and their corresponding error messages. It should be return it errors so it could be displayed under the input*/

  return validation.success ? null : { errors };
};
function formatErrors(errors: any[]) {
  const formattedErrors: { [key: string | number]: any } = {};
  errors.forEach((error) => {
    if (error.path.length > 1) formattedErrors[error.path.join('_')] = { _errors: [error.message] };
    error.path.map((path: string | number) => {
      if (!formattedErrors[path]) {
        formattedErrors[path] = { _errors: [error.message] };
      } else {
        formattedErrors[path]._errors.push(error.message);
      }
    });
  });

  return formattedErrors;
}

const processErrors = (errors: any, prefix = '', result: any = {}): any => {
  Object.keys(errors).forEach((key) => {
    if (!Array.isArray(errors[key]) && Object.keys(errors[key]).length > 1) {
      errors[key] = processErrors(
        errors[key],
        prefix !== '' ? `${prefix}_${key}` : key !== '_errors' ? key : '',
        result
      );
    } else {
      if (key !== '_errors') result[prefix !== '' ? `${prefix}_${key}` : key] = errors[key]._errors;
    }
  });

  return result;
};
export default validateData;
