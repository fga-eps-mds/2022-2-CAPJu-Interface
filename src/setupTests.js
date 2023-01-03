/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
jest.mock('./services/config.js', () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return { headers: { 'Content-Type': 'application/json' } };
    })
  };
});

jest.mock('react-dropdown', () => ({ options, value, onChange }) => {
  const notNull = value || '';

  return (
    <select
      data-testid="react-select-mock"
      value={notNull}
      onChange={(e) => onChange(e.target)}
    >
      {options.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});
jest.mock('react-flow-renderer');
