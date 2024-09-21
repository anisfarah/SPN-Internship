/**
 * Helper function to process individual items in a form data object.
 *
 * This function takes a configuration object describing a form item,
 * the value of the item in the form data object, and a target object
 * to store the processed item values. It will then assign the value
 * of the item to the corresponding key in the target object.
 *
 * @param {Object} properties The properties configuration for the form item.
 * @param {FormDataEntryValue | null} value The value of the item in the form data object.
 * @param {Object} formDataObject The object to store the processed item values.
 * @returns {Object} The modified formDataObject.
 */
function processProperties(
  properties: {
    name: string;
    // TODO add the types (check dynamicForm) remove any and put enum
    type: any;
    [key: string]: unknown;
  },
  value: FormDataEntryValue | FormDataEntryValue[] | null,
  formDataObject: { [key: string | number]: any }
): { [key: string]: any } | undefined {
  if (properties.type !== 'checkbox' && (value === null || value === undefined)) {
    return;
  }

  const keys = properties.name.split('_');
  let current = formDataObject;

  while (keys.length > 1) {
    const part = keys.shift();
    const nextPart = keys[0];

    if (!isNaN(parseInt(part as string))) {
      // If the part is a number, convert to an array index
      const index = parseInt(part as string);
      if (!Array.isArray(current)) {
        current = [];
      }
      if (!current[index]) {
        current[index] = isNaN(parseInt(nextPart)) ? {} : [];
      }
      current = current[index];
    } else {
      if (!current[part as string]) {
        current[part as string] = isNaN(parseInt(nextPart)) ? {} : [];
      }
      current = current[part as string];
    }
  }

  const lastKey = keys[0];
  if (!isNaN(parseInt(lastKey))) {
    // If the last key is a number, convert to an array index
    const index = parseInt(lastKey);
    if (!Array.isArray(current)) {
      current = [];
    }
    current[index] =
      properties.type === 'checkbox'
        ? value === 'on'
        : properties.type === 'splitTextArea' && typeof value === 'string'
          ? value
              ?.split(/\r?\n/)
              .map((word: any) => word.trim())
              .filter((word: any) => word !== '')
          : value;
  } else {
    current[lastKey] =
      properties.type === 'checkbox'
        ? value === 'on'
        : properties.type === 'splitTextArea' && typeof value === 'string'
          ? value
              // \r\n
              ?.split(/\r?\n/)
              .map((word: any) => word.trim())
              .filter((word: any) => word !== '')
          : value;
  }

  return formDataObject;
}

function processMultiEntry(
  config: Array<{
    name: string;
    parents: string[];
    type: any;
    [key: string]: unknown;
    config?: any;
    inputs?: Array<{
      name: string;
      type: any;
      [key: string]: unknown;
    }>;
  }>,
  formData: FormData,
  formDataObject: { [key: string]: any }
): { [key: string]: any } | undefined {
  config.map((property) => {
    // Iterate through FormData entries
    for (const [name, value] of formData.entries()) {
      if (
        (name.startsWith(property.parents.join('_')) && name.endsWith(property.name)) ||
        (name.startsWith(property.parents.join('_')) &&
          name.endsWith(`${property.name.replace('_old', '_new')}`))
      ) {
        // formDataObject[name] = value;
        const keys = name.split('_');
        let current: any = formDataObject;
        while (keys.length > 1) {
          const part = keys.shift();
          const nextPart = keys[0];

          if (!isNaN(parseInt(part as string))) {
            // If the part is a number, convert to an array index
            const index = parseInt(part as string);
            if (!Array.isArray(current)) {
              current = [];
            }
            if (!current[index]) {
              current[index] = isNaN(parseInt(nextPart)) ? {} : [];
            }
            current = current[index];
          } else {
            if (!current[part as string]) {
              current[part as string] = isNaN(parseInt(nextPart)) ? {} : [];
            }
            current = current[part as string];
          }
        }

        const lastKey = keys[0];
        if (!isNaN(parseInt(lastKey))) {
          // If the last key is a number, convert to an array index
          const index = parseInt(lastKey);
          if (!Array.isArray(current)) {
            current = [];
          }
          current[index] = property.type === 'checkbox' ? value === 'on' : value;
        } else {
          current[lastKey] = property.type === 'checkbox' ? value === 'on' : value;
        }
      }
    }
  });

  return formDataObject;
}
function processConfig(
  config: Array<
    | {
        name: string;
        type: any;
        [key: string]: unknown;
        config?: any;
        inputs?: Array<{
          name: string;
          type: any;
          [key: string]: unknown;
        }>;
      }
    | {
        name: string;
        type: any;
        [key: string]: unknown;
        config?: any;
        inputs?: Array<{
          name: string;
          type: any;
          [key: string]: unknown;
        }>;
      }[]
  >,
  formData: FormData,
  formDataObject: { [key: string]: any }
): { [key: string]: any } {
  // Iterate through each configuration item
  config.forEach((properties) => {
    // If the configuration item is an array, recursively call processConfig
    if (Array.isArray(properties)) {
      processConfig(properties, formData, formDataObject); // Recursive call for nested arrays
    } else if (properties.type === 'add') {
      processConfig(
        properties?.updatable
          ? Array.isArray(properties.config)
            ? properties.config
            : properties.config.fields
          : Array.isArray(properties.config)
            ? properties.config[properties.config.length - 1]
            : properties.config.fields[properties.config.fields.length - 1],
        formData,
        formDataObject
      ); // Recursive call for nested arrays
    } else if (properties.type === 'multiEntry') {
      // processConfig(properties.config, formData, formDataObject);
      processMultiEntry(properties.config, formData, formDataObject);
    } else if (properties.type === 'extend') {
      const data = [];
      for (const key in Object.fromEntries(formData)) {
        if (key.includes(properties.name)) {
          data.push({
            name: key,
            value: Object.fromEntries(formData)[key],
            type: properties.inputType
          });
        }
      }

      processConfig(data, formData, formDataObject);
    } else if (properties.type === 'accordion') {
      processConfig(
        Array.isArray(properties.config) ? properties.config : properties.config.fields,
        formData,
        formDataObject
      );
    } else if (properties.type === 'selectableAccordion') {
      properties.config.map((field: any) => {
        processConfig(
          Array.isArray(field.config) ? field.config : field.config.fields,
          formData,
          formDataObject
        );
      });
    } else {
      // Process the configuration item, assign its value to the corresponding key in formDataObject
      processProperties(
        properties,
        properties.name === 'gallery'
          ? formData.getAll(properties.name)
          : formData.get(properties.name),
        formDataObject
      );
    }
  });

  return formDataObject;
}

/**
 * Helper function to process a form data object based on a configuration.
 * The configuration is an array of objects, where each object describes a
 * property in the form. The property can have several attributes, such as its
 * name, type, and default value. The function will process each property and
 * assign its value to the corresponding key in the formDataObject object.
 * @param config The configuration for the form. Each configuration item is an object with
 *  the following properties:
 *  - `name`: The name of the form property.
 *  - `type`: The type of the form property. Can be 'checkbox', 'text', 'select', or 'textArea'.
 *  - `defaultValue`: The default value of the form property.
 *  - `[key: string]`: Additional properties that can be used to specify additional information
 *    about the form property. For example, a `placeholder` property can be used to specify a
 *    placeholder value for a text field.
 * @param formData The form data object.
 * @param formDataObject The object to store the processed item values.
 * @returns The modified formDataObject.
 */
function processFormData(
  formData: FormData,
  config: Array<
    | {
        name: string;
        type: any;
        [key: string]: unknown;
        config?: any;
      }
    | {
        name: string;
        type: any;
        [key: string]: unknown;
        config?: any;
      }[]
  >
): { [keys: string]: any } {
  // Initialize formDataObject as an empty object
  const formDataObject: { [keys: string]: any } = {};

  /**
   * Process the configuration items and assign their values to the corresponding keys
   * in the formDataObject object.
   */
  processConfig(config, formData, formDataObject);

  /**
   * Return the modified formDataObject.
   */
  return formDataObject;
}

export default processFormData;
