export default function Contact() {
      return (
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Contact</h2>
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Your Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg"
                rows="5"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
            >
              Send Message
            </button>
          </form>
        </div>
      )
    }
