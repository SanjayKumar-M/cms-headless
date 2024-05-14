const API_BASE_URL = 'http://localhost:8080/api/entities';

export const fetchEntities = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching entities:', error);
    throw error; // Throw the error to handle it in the calling component
  }
};

export const fetchEntries = async (entityName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${entityName}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching entries for entity ${entityName}:`, error);
    throw error; // Throw the error to handle it in the calling component
  }
};

export const createEntry = async (entityName, entry) => {
  try {
    await fetch(`${API_BASE_URL}/entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ entityName, entry }),
    });
  } catch (error) {
    console.error('Error creating entry:', error);
    throw error; // Throw the error to handle it in the calling component
  }
};

export const deleteEntry = async (entityName, entryId) => {
  try {
    await fetch(`${API_BASE_URL}/${entityName}/${entryId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error(`Error deleting entry ${entryId} for entity ${entityName}:`, error);
    throw error; // Throw the error to handle it in the calling component
  }
};
