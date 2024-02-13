import { ImageResponse } from 'next/og'
import SpeedIcon from '@/components/icons/speed'

export const runtime = 'edge'

export async function GET() {
    return new ImageResponse(
        (
            <div style={{
                fontSize: 92,
                background: 'white',
                width: '100%',
                height: '100%',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
            }}>
                <SpeedIcon
                    style={{
                        width: '200px',
                        height: '200px',

                    }} />
                <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <div>ポケモン</div>
                    <div>速度比較</div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 600,
        }
    )
}