import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
   global.fetch = async () => ({ json: async () => responseAPI });
   render(<App/>);
  })

  test('Verifica se aparece o card com titulo de "Rick Sanchez"',async () => {
    const title = await screen.findByRole('heading', {name: /Rick Sanchez/})
    expect(title).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const button = screen.getByRole('button', {name: 'Buscar'});
    expect(button).toBeDefined();
  })

  test('Verifica se ao buscar por "Smith" aparecem apenas 4 cards',async () => {
    const input = await screen.findByRole('textbox');
    const button = await screen.findByRole('button', {name: 'Buscar'});

    
    userEvent.type(input, 'Smith');
    userEvent.click(button);

    const RESULT_NUMBER = 4;
    const title = await screen.findAllByText(/Smith/i);
    expect(title.length).toBe(RESULT_NUMBER);
  })

})