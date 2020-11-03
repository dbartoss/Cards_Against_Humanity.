export const getIdParam = (id: string = undefined) => (id ? { _id: id } : {});
