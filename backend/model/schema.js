import mongoose from 'mongoose';

const entitySchemaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  attributes: { type: Object, required: true },
  schema: { type: mongoose.Schema.Types.Mixed },
});

entitySchemaSchema.pre('save', function(next) {
  const schema = {};

  for (const [key, value] of Object.entries(this.attributes)) {
    if (typeof value === 'string') {
      schema[key] = { type: getSchemaType(value) };
    } else {
      console.warn(`Invalid attribute type for ${key}: ${value}`);
    }
  }

  this.schema = new mongoose.Schema(schema);
  next();
});

function getSchemaType(type) {
  switch (type.toLowerCase()) {
    case 'string':
      return String;
    case 'number':
      return Number;
    case 'date':
      return Date;
    case 'boolean':
      return Boolean;
    default:
      throw new Error(`Invalid type: ${type}`);
  }
}

const EntitySchema = mongoose.model('EntitySchema', entitySchemaSchema);

export default EntitySchema;