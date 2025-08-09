import type { ReactNode } from "react"
import Image from "next/image"

type Post = {
  title: string
  excerpt: string
  slug: string
  content: ReactNode
}

export const allPosts: Post[] = [
  {
    title: "The Art of Digital Storytelling",
    excerpt: "Exploring how animations and interactions can create compelling narratives online.",
    slug: "digital-storytelling",
    content: (
      <>
        <p>
          In the digital age, storytelling has transcended the boundaries of traditional text. We now have a vast canvas
          of interactive elements, animations, and immersive experiences to weave narratives that captivate and engage
          users on a deeper level. This is the art of digital storytelling: using technology not just to present
          information, but to create a journey.
        </p>
        <h3 className="text-2xl font-bold mt-8 mb-4">The Power of Interaction</h3>
        <p>
          Allowing users to interact with the story—whether by clicking, dragging, or scrolling—transforms them from
          passive observers into active participants. Every interaction can unveil a new piece of the narrative, making
          the experience personal and memorable. GSAP and Framer Motion are powerful tools that allow us to orchestrate
          these complex animations with precision and performance.
        </p>
      </>
    ),
  },
  {
    title: "Performance in the Age of WebGL",
    excerpt: "Optimizing Three.js scenes for a smooth experience on all devices.",
    slug: "performance-webgl",
    content: (
      <>
        <p>
          WebGL has opened up a new dimension for web experiences, allowing for rich, 3D graphics directly in the
          browser. However, with great power comes great responsibility. A poorly optimized Three.js scene can quickly
          bring a browser to its knees. Performance is not an afterthought; it's a critical component of the user
          experience.
        </p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Key Optimization Techniques</h3>
        <ul className="list-disc list-inside space-y-2 my-4">
          <li>
            <strong>Geometry Instancing:</strong> Render multiple copies of the same object with a single draw call.
          </li>
          <li>
            <strong>Texture Atlasing:</strong> Combine multiple textures into a single image to reduce HTTP requests and
            GPU memory usage.
          </li>
          <li>
            <strong>Level of Detail (LOD):</strong> Use simpler models for objects that are far from the camera.
          </li>
          <li>
            <strong>Shaders:</strong> Offload complex calculations from the CPU to the GPU using custom GLSL shaders.
          </li>
        </ul>
        <pre className="bg-[#1a1a1a] p-4 rounded-lg my-8 overflow-x-auto">
          <code className="text-sm font-mono">
            {`// Example of using InstancedMesh in Three.js
const mesh = new THREE.InstancedMesh(geometry, material, count);
scene.add(mesh);`}
          </code>
        </pre>
      </>
    ),
  },
  {
    title: "GSAP vs. Framer Motion: A Deep Dive",
    excerpt: "When to use which library to achieve stunning web animations.",
    slug: "gsap-vs-framer-motion",
    content: (
      <>
        <p>
          When it comes to web animation, GSAP (GreenSock Animation Platform) and Framer Motion are two of the most
          popular and powerful libraries available. Both can create stunning animations, but they have different
          philosophies and are suited for different use cases.
        </p>
        <h3 className="text-2xl font-bold mt-8 mb-4">GSAP: The Powerhouse</h3>
        <p>
          GSAP is a professional-grade animation library that offers unparalleled performance, flexibility, and control.
          It's imperative, meaning you tell it exactly what to do and when. This makes it ideal for complex,
          timeline-based animations and orchestrating intricate sequences.
        </p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Framer Motion: The React-Friendly Choice</h3>
        <p>
          Framer Motion is a declarative animation library designed specifically for React. It integrates seamlessly
          with React components, making it incredibly easy to animate components based on state changes. Its simple API
          and focus on gesture-based animations make it a great choice for UI interactions.
        </p>
        <p>
          Ultimately, the choice depends on the project. For complex, artistic animations, GSAP is often the winner. For
          interactive UIs in React, Framer Motion shines. In many projects, like this one, we even use both to leverage
          their respective strengths.
        </p>
      </>
    ),
  },
  {
    title: "Designing for Emotion",
    excerpt: "How to evoke feelings and create memorable user journeys.",
    slug: "designing-for-emotion",
    content: (
      <>
        <p>
          Great design goes beyond usability and aesthetics; it connects with users on an emotional level. Designing for
          emotion is about creating experiences that are not just functional but also delightful, engaging, and
          memorable.
        </p>
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="Designing for Emotion"
          width={800}
          height={400}
          className="rounded-lg my-8"
        />
        <p>
          This can be achieved through various means: the use of color, typography, imagery, and of course, animation. A
          subtle animation can make an interface feel more responsive and alive. A beautiful transition can turn a
          simple navigation into a moment of delight. By considering the emotional impact of our design choices, we can
          create products that users love.
        </p>
      </>
    ),
  },
  {
    title: "The Future is 3D: Integrating Three.js in Next.js",
    excerpt: "A practical guide to bringing 3D models and scenes into your React applications.",
    slug: "future-is-3d",
    content: (
      <>
        <p>
          The web is evolving from a 2D medium to a 3D one. With libraries like Three.js and its React renderer, React
          Three Fiber, it's easier than ever to integrate immersive 3D experiences into your web applications. This site
          is a testament to that, using Three.js to create the background animations you see.
        </p>
        <h3 className="text-2xl font-bold mt-8 mb-4">Getting Started with React Three Fiber</h3>
        <p>
          React Three Fiber (R3F) allows you to build your Three.js scene declaratively with reusable, self-contained
          components that react to state. It's a powerful paradigm that simplifies 3D development in React.
        </p>
        <pre className="bg-[#1a1a1a] p-4 rounded-lg my-8 overflow-x-auto">
          <code className="text-sm font-mono">
            {`import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </Canvas>
  )
}`}
          </code>
        </pre>
        <p>
          With just a few lines of code, you can have a 3D scene running in your Next.js application. The possibilities
          are endless, from simple product viewers to complex, interactive games.
        </p>
      </>
    ),
  },
]

export const getPostBySlug = (slug: string) => {
  return allPosts.find((post) => post.slug === slug)
}
