const rules = {
  admin: { static: ['*'] },
  co: { static: ['users:list','divisions:*','officers:*','sailors:*','organization:view'] },
  officer: { static: ['sailors:*','organization:view'] },
  sailor: { static: ['self:view'] },
};
export default rules;
