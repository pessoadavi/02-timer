import { ButtonVariant } from "./Button.styles";
import { ButtonContainer } from "./Button.styles";

interface ButtonProps {
    variant?: ButtonVariant
}

export const Button = ({ variant = 'primary' }: ButtonProps) => {
    return (
        <>
            <ButtonContainer variant={variant}>Enviar</ButtonContainer>
        </>
    );
}