import { useEffect, useRef } from 'react'

interface IntroAnimationProps {
  onComplete: () => void
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) {
      console.error('WebGL not supported')
      onComplete()
      return
    }

    // Vertex Shader
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `

    // Fragment Shader - Liquid Orb Effect
    const fsSource = `
      precision mediump float;
      uniform float uTime;
      uniform vec2 uResolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        uv = uv * 2.0 - 1.0;
        uv.x *= uResolution.x / uResolution.y;

        float t = uTime * 0.5;
        
        // Create organic movement
        float d = length(uv);
        vec3 col = vec3(0.0);
        
        // Orb shape with noise
        float r = 0.3 + 0.1 * sin(atan(uv.y, uv.x) * 5.0 + t * 2.0) 
                  + 0.05 * sin(atan(uv.y, uv.x) * 10.0 - t * 3.0);
        
        // Soft glow
        float glow = 0.02 / abs(d - r);
        
        // Apple-like colors (Blue, Purple, Cyan)
        vec3 color1 = vec3(0.0, 0.48, 1.0); // Apple Blue
        vec3 color2 = vec3(0.6, 0.2, 0.8);  // Purple
        vec3 color3 = vec3(0.0, 0.8, 0.9);  // Cyan
        
        // Mix colors based on position and time
        vec3 finalColor = mix(color1, color2, sin(uv.x * 2.0 + t) * 0.5 + 0.5);
        finalColor = mix(finalColor, color3, cos(uv.y * 2.0 - t) * 0.5 + 0.5);
        
        col += finalColor * glow;
        
        // Fade out edges
        col *= 1.0 - smoothstep(0.0, 1.5, d);

        gl_FragColor = vec4(col, 1.0);
      }
    `

    const initShaderProgram = (
      gl: WebGLRenderingContext,
      vsSource: string,
      fsSource: string,
    ) => {
      const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
      const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
      if (!vertexShader || !fragmentShader) return null

      const shaderProgram = gl.createProgram()
      if (!shaderProgram) return null

      gl.attachShader(shaderProgram, vertexShader)
      gl.attachShader(shaderProgram, fragmentShader)
      gl.linkProgram(shaderProgram)

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.error(
          'Unable to initialize the shader program: ' +
            gl.getProgramInfoLog(shaderProgram),
        )
        return null
      }
      return shaderProgram
    }

    const loadShader = (
      gl: WebGLRenderingContext,
      type: number,
      source: string,
    ) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(
          'An error occurred compiling the shaders: ' +
            gl.getShaderInfoLog(shader),
        )
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource)
    if (!shaderProgram) return

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        uTime: gl.getUniformLocation(shaderProgram, 'uTime'),
        uResolution: gl.getUniformLocation(shaderProgram, 'uResolution'),
      },
    }

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    const positions = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0]
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW)

    let startTime = Date.now()
    let animationFrameId: number

    const render = () => {
      const currentTime = (Date.now() - startTime) * 0.001

      // Resize canvas
      if (
        canvas.width !== canvas.clientWidth ||
        canvas.height !== canvas.clientHeight
      ) {
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
      }

      gl.clearColor(0.0, 0.0, 0.0, 1.0) // Black background for intro
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.useProgram(programInfo.program)

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0,
      )
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)

      gl.uniform1f(programInfo.uniformLocations.uTime, currentTime)
      gl.uniform2f(
        programInfo.uniformLocations.uResolution,
        canvas.width,
        canvas.height,
      )

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      // Animation duration logic
      if (currentTime < 3.5) {
        animationFrameId = requestAnimationFrame(render)
      } else {
        // Fade out logic handled by CSS on container
        setTimeout(onComplete, 500)
      }
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center animate-fade-out"
      style={{ animationDelay: '3s', animationFillMode: 'forwards' }}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute bottom-10 text-white/50 text-sm font-medium tracking-widest uppercase animate-pulse">
        Loading Experience
      </div>
    </div>
  )
}