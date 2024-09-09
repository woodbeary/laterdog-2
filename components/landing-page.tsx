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

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* Keep the existing 3D heart model */}
        <div className="w-full aspect-square max-w-[80vh] flex items-center justify-center mb-4 sm:mb-8 relative z-10">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Canvas camera={{ position: [0, 0, 25], fov: 50 }} className="bg-gray-900">
              <Suspense fallback={<LoadingPlaceholder />}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={0.8} />
                <HeartModel scale={[10, 10, 10]} position={[0, 0, 0]} rotation={[0, Math.PI, 0]} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={5} />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </div>

        {/* Revert the title to its normal state */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 text-green-300">
          later.dog
        </h1>
        <p className="text-center mb-8 sm:mb-12 text-green-400 text-sm sm:text-base">Where code commits lead to real-life commits</p>
        
        <Card className="bg-gray-800 border-green-500 mb-4 sm:mb-8 w-full">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-green-300">
              Join the Hack
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full bg-black hover:bg-gray-900 text-white rounded-full shadow-md transition-all duration-200 ease-in-out flex items-center justify-center" onClick={handleXLogin}>
              <Image src="/images/logo-white.png" alt="X logo" width={24} height={24} className="mr-2" />
              Login with X
            </Button>
          </CardContent>
        </Card>
        
        {/* New card for site demonstration */}
        <Card className="bg-gray-800 border-green-500 w-full mb-8">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-green-300">How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <video 
                className="w-full h-full object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
                poster="/images/video-poster.jpg" // Add a poster image if you want a custom thumbnail
              >
                <source src="/images/main.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <p className="text-center text-green-400">
              Swipe, match, and connect with fellow developers based on your GitHub activity and coding interests.
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-800 border-green-500 w-full mb-8">
          <CardContent className="text-green-100 text-sm sm:text-base pt-4 pb-6"> {/* Increased bottom padding */}
            <p className="mb-4 sm:mb-6">
              <span className="font-bold text-green-300">later.dog</span> [ley-ter dog]
            </p>
            <ol className="list-decimal list-inside space-y-1 sm:space-y-2 mb-4"> {/* Added bottom margin */}
              <li>A casual farewell between developers, often used after intense coding sessions or hackathons.</li>
              <li>The moment when your perfect match is just a commit away.</li>
              <li>The act of postponing a date to fix "one last bug".</li>
            </ol>
            <p className="mt-2 sm:mt-4 italic text-green-400 min-h-[1.5rem]"> {/* Set minimum height */}
              {typedText1}
            </p>
            <p className="mt-1 sm:mt-2 italic text-green-400 min-h-[1.5rem]"> {/* Set minimum height */}
              {typedText2}
              <span className={`ml-1 inline-block w-2 h-4 bg-green-400 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}></span>
            </p>
          </CardContent>
        </Card>

        {/* Security Note */}
        <div className="text-xs text-green-600 mt-4 text-center">
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
                className="text-green-500 p-0 h-auto mt-2" 
                onClick={() => setShowFullSecurityNote(false)}
              >
                Show Less <ChevronUp className="w-3 h-3 ml-1" />
              </Button>
            </>
          ) : (
            <Button 
              variant="link" 
              className="text-green-500 p-0 h-auto mt-2" 
              onClick={() => setShowFullSecurityNote(true)}
            >
              Learn More <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>

        {/* Credits accordion */}
        <div className="text-xs text-green-600 mt-8 w-full max-w-2xl">
          <Button 
            variant="ghost" 
            className="w-full flex flex-col items-center py-2"
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
            {showFullCredits ? <ChevronUp className="w-4 h-4 mt-2" /> : <ChevronDown className="w-4 h-4 mt-2" />}
          </Button>
          
          {showFullCredits && (
            <div className="bg-gray-800 p-4 rounded-lg mt-2 flex flex-col items-center gap-4">
              <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <Twitter className="w-4 h-4 mr-2" /> Powered by X
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <Github className="w-4 h-4 mr-2" /> GitHub API
              </Link>
              <Link href="https://v0.dev" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <Code className="w-4 h-4 mr-2" /> Built with v0
              </Link>
              <Link href="https://cursor.sh" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <MousePointer className="w-4 h-4 mr-2" /> Developed in Cursor
              </Link>
              <Link href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <Palette className="w-4 h-4 mr-2" /> UI by shadcn
              </Link>
              <Link href="https://x.ai" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <Bot className="w-4 h-4 mr-2" /> Roasts by xAI's Grok
              </Link>
              <Link href="https://lumalabs.ai" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <ImageIcon className="w-4 h-4 mr-2" /> 3D by Luma AI
              </Link>
              <Link href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <Zap className="w-4 h-4 mr-2" /> Hosted on Vercel
              </Link>
              <Link href="https://firebase.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <Database className="w-4 h-4 mr-2" /> Data by Firebase
              </Link>
              <Link href="https://twitter.com/laterdogX" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-300 transition-colors">
                <Image src="/images/logo-white.png" alt="X logo" width={16} height={16} className="mr-2" />
                @laterdogX
              </Link>
            </div>
          )}
        </div>

        {/* Additional notes */}
        <div className="text-xs text-green-600 mt-4 text-center">
          <p>We support free speech and the pursuit of happiness.</p>
          <p className="mt-2">Special thanks to Elon Musk for all he continues to do,</p>
          <p>and to the build-in-public community for their unwavering support.</p>
        </div>

        {/* Changelog link */}
        <Link href="/changelog" className="mt-4 inline-flex items-center text-green-500 hover:text-green-400 transition-colors">
          <Scroll size={14} className="mr-1" />
          View Changelog
        </Link>
      </div>
    </div>
  )
}