//About page

// Info page about TamaCatAI!
import Link from "next/link"
export default function About() {
    return (
        <div>
            <h2>about</h2>
            <p>a tiny project featuring</p>
            <p>a tiny virtual cat</p>
            <p>made with...</p>
            <ul>
                <li>node.js 20.x</li>
                <li>next.js 15.x</li>
                <li>postgresql 17.x</li>
                <li>npm or yarn</li>
                <li>cat frames in ascii array</li>
            </ul>
            <Link href="/"><button>return...</button></Link>
        </div>
    )
}