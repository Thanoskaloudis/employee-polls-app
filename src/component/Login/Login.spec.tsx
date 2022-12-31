import { render, screen, fireEvent } from "../../utils/test.helper";
import * as hooks from "../../store/hooks";
import { Login } from "./Login";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Login', function () {
    
    beforeEach(() => {
      mockedUsedNavigate.mockReset();
    });

    it('should render', function () {
        const { container } = render(<Login />);

        expect(container).toMatchSnapshot();
    });

    it('should trigger login', function () {
        const useAppDispatch = jest.spyOn(hooks, 'useAppDispatch')
        const useAppSelector = jest.spyOn(hooks, 'useAppSelector')

        useAppSelector.mockReturnValue({
            isAuthenticated: false,
            userId: undefined,
            status: 'idle',
        });

        const dummyDispatch = jest.fn().mockImplementation(() => {
          return {
            finally: () => {
              return true;
            }
          };
        });
        
        useAppDispatch.mockReturnValue(dummyDispatch);

        render(<Login />);

        const button = screen.getByRole('button')
        fireEvent.click(button);
        expect(dummyDispatch).toBeCalledTimes(1);

        useAppDispatch.mockRestore();
        useAppSelector.mockRestore();
    });

    it('should show failed login info', function () {
        const useAppDispatch = jest.spyOn(hooks, 'useAppDispatch')
        const useAppSelector = jest.spyOn(hooks, 'useAppSelector')

        useAppSelector.mockReturnValue({
            isAuthenticated: false,
            userId: undefined,
            status: 'idle',
        });

        useAppSelector.mockReturnValue({
            status: 'failed',
        })

        const { container } = render(<Login />);

        const text = "Your Login attemp was not successful.";
        expect(screen.getByTestId("alert-message")).toHaveTextContent(text);

        expect(container).toMatchSnapshot();

        useAppDispatch.mockRestore();
        useAppSelector.mockRestore();
    });
});
