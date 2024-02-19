import { ImageResponse } from 'next/og'
import SpeedIcon from '@/components/icons/speed'
import Logo from '@/components/icons/logo'

export const runtime = 'edge'

export async function GET() {
    return new ImageResponse(
        (
            <div style={{
                background: 'white',
                width: '100%',
                height: '100%',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Logo style={{
                    width: '600px',
                    height: '200px'
                }} />
            </div>
        ),
        {
            width: 1200,
            height: 600,
        }
    )
}