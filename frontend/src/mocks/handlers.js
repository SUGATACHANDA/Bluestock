import { rest } from 'msw';

export const handlers = [
    rest.get('/api/ipos', (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json([
                {
                    ipo_id: '1',
                    price_band: '10-20',
                    status: 'OPEN',
                },
            ])
        );
    }),

    rest.get('/api/ipos/:id', (req, res, ctx) => {
        const { id } = req.params;
        return res(
            ctx.status(200),
            ctx.json({
                ipo_id: id,
                price_band: '15-30',
                status: 'UPCOMING',
            })
        );
    }),
];
