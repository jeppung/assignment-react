import { BrowserRouter } from 'react-router-dom';
import Transfer from './Transfer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

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
})