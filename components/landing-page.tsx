'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { Bot, Code, MousePointer, Palette, Github, Twitter, Lock, ChevronDown, ChevronUp, Play, Image as ImageIcon, Zap, Database, Scroll } from 'lucide-react'
import Link from 'next/link'
import { Canvas, useFrame, extend, ReactThreeFiber } from '@react-three/fiber'
import { useGLTF, OrbitControls, shaderMaterial } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import * as THREE from 'three'
import { ErrorBoundary } from 'react-error-boundary'
import Image from 'next/image'
import SwipeMockup from './SwipeMockup'

type GLTFResult = GLTF & {
  nodes: {
    Heart: THREE.Mesh
  }
  materials: {
    Green: THREE.MeshStandardMaterial
  }
}

const GlitchMaterial = shaderMaterial(
  {
    time: 0,
    distort: 0.5,
  },
  // vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float time;
    uniform float distort;
    varying vec2 vUv;
    void main() {
      vec2 uv = vUv;
      
      // Glitch effect
      float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
      float glitch = step(0.99, sin(time * 10.0 + noise * 1000.0) * 0.5 + 0.5);
      
      uv.x += glitch * 0.1 * sin(time * 50.0);
      
      // Color shift
      float r = texture2D(map, uv + vec2(0.1, 0.0) * distort * glitch).r;
      float g = texture2D(map, uv).g;
      float b = texture2D(map, uv - vec2(0.1, 0.0) * distort * glitch).b;
      
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
)

extend({ GlitchMaterial })

// Extend the JSX namespace
declare global {
  namespace JSX {
    interface IntrinsicElements {
      glitchMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial,
        THREE.ShaderMaterial
      >
    }
  }
}

function HeartModel(props: JSX.IntrinsicElements['group']) {
  const result = useGLTF('/images/green.glb') as GLTFResult
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null)
  
  useFrame((state) => {
    if (materialRef.current) {
      const pulseFactor = Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 0.8
      materialRef.current.emissiveIntensity = pulseFactor
    }
  })

  useEffect(() => {
    if (result.scene) {
      result.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x00ff00),
            emissive: new THREE.Color(0x00ff00),
            emissiveIntensity: 1,
            transparent: true,
            opacity: 0.8,
          })
          child.material = material
          materialRef.current = material
        }
      })
    }
  }, [result])

  return <primitive object={result.scene} {...props} />
}

// Make sure to keep this line at the end of the file
useGLTF.preload('/images/green.glb')

function LoadingPlaceholder() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="green" wireframe />
    </mesh>
  )
}

function ErrorFallback({error}: {error: Error}) {
  return (
    <div role="alert">
      <p>Error loading 3D model:</p>
      <pre>{error.message}</pre>
    </div>
  )
}

export function LandingPage() {
  const router = useRouter()
  const [showFullSecurityNote, setShowFullSecurityNote] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const [typedText1, setTypedText1] = useState('')
  const [typedText2, setTypedText2] = useState('')
  const [showFullCredits, setShowFullCredits] = useState(false)
  const fullText1 = '"Just pushed my changes. later.dog!"'
  const fullText2 = '"Found a coding soulmate on later.dog. Our commit histories were meant to be!"'

  const handleXLogin = () => {
    router.push('/login')
  }

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    let i = 0
    let j = 0
    const typingInterval = setInterval(() => {
      if (i < fullText1.length) {
        setTypedText1(fullText1.slice(0, i + 1))
        i++
      } else if (j < fullText2.length) {
        setTypedText2(fullText2.slice(0, j + 1))
        j++
      } else {
        clearInterval(typingInterval)
      }
    }, 120) // Slightly faster typing speed

    return () => {
      clearInterval(cursorInterval)
      clearInterval(typingInterval)
    }
  }, [])

  const [isDay, setIsDay] = useState(true)

  useEffect(() => {
    const checkTime = () => {
      const hours = new Date().getHours()
      setIsDay(hours >= 6 && hours < 18) // Day time between 6 AM and 6 PM
    }
    checkTime() // Check immediately
    const interval = setInterval(checkTime, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [])

  const bgColor = isDay ? 'bg-white' : 'bg-black'
  const textColor = isDay ? 'text-gray-900' : 'text-emerald-300'
  const greenTextColor = isDay ? 'text-blue-600' : 'text-emerald-400'
  const cardBgColor = isDay ? 'bg-gray-50' : 'bg-gray-900'
  const cardBorderColor = isDay ? 'border-gray-200' : 'border-emerald-700'

  return (
    <div className={`min-h-screen ${bgColor} ${textColor} font-mono p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden`}>
      <div className="w-full max-w-4xl flex flex-col items-center relative z-10">
        {/* 3D Heart Model */}
        <div className="w-full aspect-square max-w-[60vh] flex items-center justify-center mb-4 sm:mb-8 relative z-10">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Canvas camera={{ position: [0, 0, 25], fov: 50 }} className="!bg-transparent">
              <Suspense fallback={<LoadingPlaceholder />}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <HeartModel scale={[10, 10, 10]} position={[0, 0, 0]} rotation={[0, Math.PI, 0]} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* Title and Subtitle */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 sm:mb-6 ${isDay ? 'text-blue-600' : 'text-emerald-400 glitch'}`} data-text="later.dog">
          later.dog
        </h1>
        <p className={`text-center mb-12 sm:mb-16 ${textColor} text-lg sm:text-xl ${isDay ? '' : 'terminal-text'}`}>
          Where code commits lead to real-life commits
        </p>
        
        {/* Login Card */}
        <Card className={`border mb-12 sm:mb-16 w-full max-w-md ${cardBgColor} ${cardBorderColor} shadow-lg`}>
          <CardHeader>
            <CardTitle className={`text-2xl sm:text-3xl ${isDay ? 'text-gray-800' : 'text-emerald-300'}`}>
              Get Started
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className={`w-full rounded-full shadow-md transition-all duration-200 ease-in-out flex items-center justify-center text-lg ${isDay ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
              onClick={handleXLogin}
            >
              <Image src="/images/logo-white.png" alt="X logo" width={28} height={28} className="mr-3" />
              Login with X
            </Button>
          </CardContent>
        </Card>
        
        {/* How It Works Section */}
        <div className="w-full mb-16">
          <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${isDay ? 'text-gray-800' : 'text-emerald-300'}`}>How It Works</h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <SwipeMockup />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <ol className={`list-decimal list-inside space-y-4 text-lg ${isDay ? 'text-gray-700' : 'text-emerald-200'}`}>
                <li>Sign up with your X account</li>
                <li>Connect your GitHub profile</li>
                <li>Swipe through developer profiles</li>
                <li>Match based on coding compatibility</li>
                <li>Start collaborating on projects</li>
              </ol>
            </div>
          </div>
        </div>
        
        {/* Definition Card */}
        <Card className={`border w-full mb-10 ${cardBgColor} ${cardBorderColor} shadow-lg`}>
          <CardContent className={`pt-6 pb-6 ${isDay ? 'text-gray-800' : 'text-emerald-300'}`}>
            <p className="text-2xl font-bold mb-4">
              <span className={`${greenTextColor} font-extrabold`}>later.dog</span> [ley-ter dog]
            </p>
            <ol className={`list-decimal list-inside space-y-2 mb-6 ${isDay ? 'text-gray-700' : 'text-emerald-200'}`}>
              <li>A casual farewell between developers, often used after intense coding sessions or hackathons.</li>
              <li>The moment when your perfect match is just a commit away.</li>
              <li>The act of postponing a date to fix "one last bug".</li>
            </ol>
            <p className={`mt-4 italic min-h-[1.5rem] ${isDay ? 'text-gray-600' : 'text-emerald-500'}`}>
              {typedText1}
            </p>
            <p className={`mt-2 italic min-h-[1.5rem] ${isDay ? 'text-gray-600' : 'text-emerald-500'}`}>
              {typedText2}
              <span className={`ml-1 inline-block w-2 h-4 ${isDay ? 'bg-gray-600' : 'bg-emerald-500'} ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
            </p>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="text-xs text-emerald-600 mt-4 text-center">
          <div className="flex items-center justify-center mb-2">
            <Lock className="w-4 h-4 mr-1" />
            <p>Your security is our top priority.</p>
          </div>
          <p>We use minimal data and strict security practices.</p>
          {showFullSecurityNote ? (
            <>
              <p className="mt-2">We never sell your info or use advertisers. Your data is secured via X and GitHub OAuth.</p>
              <p className="mt-2">Join us in making the world better - we value your suggestions!</p>
              <Button 
                variant="link" 
                className="text-emerald-500 p-0 h-auto mt-2" 
                onClick={() => setShowFullSecurityNote(false)}
              >
                Show Less <ChevronUp className="w-3 h-3 ml-1" />
              </Button>
            </>
          ) : (
            <Button 
              variant="link" 
              className="text-emerald-500 p-0 h-auto mt-2" 
              onClick={() => setShowFullSecurityNote(true)}
            >
              Learn More <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>

        {/* Credits section */}
        <div className="text-xs text-emerald-600 mt-8 w-full max-w-2xl">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-center py-2 hover:bg-transparent hover:text-emerald-400 transition-colors duration-200 group"
            onClick={() => setShowFullCredits(!showFullCredits)}
          >
            <span className="flex items-center justify-center flex-wrap gap-2">
              <Twitter className="w-4 h-4" />
              <Github className="w-4 h-4" />
              <Code className="w-4 h-4" />
              <Palette className="w-4 h-4" />
              <Bot className="w-4 h-4" />
              <ImageIcon className="w-4 h-4" />
              <Zap className="w-4 h-4" />
              <Database className="w-4 h-4" />
            </span>
            {showFullCredits ? (
              <ChevronUp className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-[-2px]" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2 transition-transform group-hover:translate-y-[2px]" />
            )}
          </Button>
          
          {showFullCredits && (
            <div className="mt-2 flex flex-col items-center gap-4 animate-fadeIn">
              <Link href="/coming-soon" className="flex items-center hover:text-emerald-300 transition-colors">
                <Twitter className="w-4 h-4 mr-2" /> Powered by X
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-300 transition-colors">
                <Github className="w-4 h-4 mr-2" /> GitHub API
              </Link>
              <Link href="https://v0.dev" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-300 transition-colors">
                <Code className="w-4 h-4 mr-2" /> Built with v0
              </Link>
              <Link href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-300 transition-colors">
                <MousePointer className="w-4 h-4 mr-2" /> Developed in Cursor
              </Link>
              <Link href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-300 transition-colors">
                <Palette className="w-4 h-4 mr-2" /> UI by shadcn
              </Link>
              <Link href="https://x.ai" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-300 transition-colors">
                <Bot className="w-4 h-4 mr-2" /> Roasts by xAI's Grok
              </Link>
              <Link href="https://lumalabs.ai" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-300 transition-colors">
                <ImageIcon className="w-4 h-4 mr-2" /> 3D by Luma AI
              </Link>
              <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-300 transition-colors">
                <Zap className="w-4 h-4 mr-2" /> Hosted on Vercel
              </Link>
              <Link href="https://firebase.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-300 transition-colors">
                <Database className="w-4 h-4 mr-2" /> Data by Firebase
              </Link>
              <Link href="https://twitter.com/laterdogX" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-emerald-300 transition-colors">
                <Image src="/images/logo-white.png" alt="X logo" width={16} height={16} className="mr-2" />
                @laterdogX
              </Link>
            </div>
          )}
        </div>

        {/* Additional notes */}
        <div className="text-xs text-emerald-600 mt-4 text-center">
          <p>We support free speech and the pursuit of happiness.</p>
          <p className="mt-2">Special thanks to Elon Musk for all he continues to do,</p>
          <p>and to the build-in-public community for their unwavering support.</p>
        </div>

        {/* Changelog link */}
        <Link href="/changelog" className="mt-4 inline-flex items-center text-emerald-500 hover:text-emerald-400 transition-colors">
          <Scroll size={14} className="mr-1" />
          View Changelog
        </Link>
      </div>
    </div>
  )
}

// Add this CSS at the end of the file or in a separate CSS module
const styles = `
  .hacker-background {
    position: relative;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .glitch {
    position: relative;
    animation: glitch 3s infinite;
    text-shadow: 0 0 2px #0f0, 0 0 4px #0f0;
  }

  .glitch::before,
  .glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .glitch::before {
    left: 2px;
    text-shadow: -1px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
  }

  .glitch::after {
    left: -2px;
    text-shadow: -1px 0 #00fff9, 1px 1px #ff00c1;
    animation: glitch-anim2 1s infinite linear alternate-reverse;
  }

  @keyframes glitch-anim {
    0% {
      clip: rect(10px, 9999px, 31px, 0);
      transform: skew(0.55deg);
    }
    5% {
      clip: rect(70px, 9999px, 71px, 0);
      transform: skew(0.03deg);
    }
    10% {
      clip: rect(5px, 9999px, 32px, 0);
      transform: skew(0.05deg);
    }
    /* ... add more keyframes as needed */
  }

  @keyframes glitch-anim2 {
    0% {
      clip: rect(65px, 9999px, 99px, 0);
      transform: skew(0.03deg);
    }
    5% {
      clip: rect(87px, 9999px, 10px, 0);
      transform: skew(0.6deg);
    }
    10% {
      clip: rect(53px, 9999px, 26px, 0);
      transform: skew(0.44deg);
    }
    /* ... add more keyframes as needed */
  }

  .glow {
    text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;
  }

  /* Add this to make all text have a subtle glow */
  .min-h-screen {
    text-shadow: none;
  }

  /* Enhance the glow effect on hover for interactive elements */
  a:hover, button:hover {
    text-shadow: 0 0 2px currentColor;
    transition: text-shadow 0.3s ease, color 0.3s ease;
  }

  /* Add a specific style for the accordion button */
  .text-emerald-600 button:hover {
    background-color: transparent !important;
    color: #0f0 !important;
    text-shadow: 0 0 5px #0f0, 0 0 10px #0f0;
  }

  /* Add animation for the dropdown */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }

  .terminal-text {
    text-shadow: 0 0 5px #0f0;
  }

  /* Add these new styles for day/night themes */
  .bg-white {
    background-color: #ffffff;
  }

  .bg-black {
    background-color: #000000;
  }

  .text-gray-900 {
    color: #1a202c;
  }

  .text-emerald-400 {
    color: #4fd1c5;
  }

  /* Adjust other elements for day/night themes */
  .bg-white .card {
    background-color: #f7fafc;
    border-color: #e2e8f0;
  }

  .bg-black .card {
    background-color: #192734;
    border-color: #38444d;
  }

  .bg-white .text-blue-500 {
    color: #2c7a7b;
  }

  .bg-black .text-emerald-300 {
    color: #4fd1c5;
  }

  /* Adjust hover effects for day/night themes */
  .bg-white a:hover,
  .bg-white button:hover {
    text-shadow: 0 0 5px #4fd1c5, 0 0 10px #4fd1c5;
  }

  .bg-black a:hover,
  .bg-black button:hover {
    text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 15px #0f0;
  }

  .text-emerald-300,
  .text-emerald-400,
  .text-emerald-500,
  .text-emerald-600 {
    text-shadow: none;
  }

  .glow {
    text-shadow: 0 0 2px #0f0, 0 0 4px #0f0;
  }

  /* Remove the general text shadow */
  .min-h-screen {
    text-shadow: none;
  }

  /* Adjust hover effects */
  a:hover, button:hover {
    text-shadow: 0 0 2px currentColor;
    transition: text-shadow 0.3s ease;
  }
`

// Add this line at the end of the file
export const styleTag = <style jsx global>{styles}</style>