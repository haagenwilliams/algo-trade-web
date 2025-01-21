export default function About() {
      return (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-600 mb-4">
                I'm a quantitative developer with 5+ years of experience in
                building algorithmic trading systems...
              </p>
              <div className="space-x-4">
                <a
                  href="https://linkedin.com"
                  className="text-accent hover:underline"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com"
                  className="text-accent hover:underline"
                >
                  GitHub
                </a>
                <a
                  href="/resume.pdf"
                  className="text-accent hover:underline"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }
