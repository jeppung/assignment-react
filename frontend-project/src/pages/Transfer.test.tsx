import { BrowserRouter } from 'react-router-dom';
import Transfer from './Transfer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { useState } from 'react';
import InputAmount from '../components/InputAmount';

const MockInputAmount = () => {
    const [value, setValue] = useState<number | string>("")

    return <InputAmount onChange={(data) => setValue(data)} value={value} />
}

describe("Transfer Page", () => {
    it("Should render transfer form", async () => {
        render(
            <BrowserRouter>
                <Transfer />
            </BrowserRouter>
        )

        const transferForm = await screen.findByTestId("transfer-form")

        expect(transferForm).toBeVisible()
    })

    it("Input amount can be typed", async () => {
        const user = userEvent.setup()
        render(<MockInputAmount />)

        const inputAmount = await screen.findByLabelText("Amount")

        await user.type(inputAmount, "123")

        expect(inputAmount).toHaveValue(123)
    })

    it("Input amount cannot be typed with alphabet characters", async () => {
        const user = userEvent.setup()
        render(<MockInputAmount />)

        const inputAmount = await screen.findByLabelText("Amount")

        await user.type(inputAmount, "abc")

        expect(inputAmount).not.toHaveValue("abc")
    })
})