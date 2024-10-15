export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold">IHSAN ALHAKIM</span>. All Rights Reserved.
      </p>
      <div className="mt-2">
        <span>Follow us on:</span>
        <a href="#" className="text-blue-400 hover:underline mx-2">
          Facebook
        </a>
        |
        <a href="#" className="text-blue-400 hover:underline mx-2">
          Twitter
        </a>
        |
        <a href="#" className="text-blue-400 hover:underline mx-2">
          Instagram
        </a>
      </div>
      <div className="mt-2">
        <a href="/privacy-policy" className="text-gray-400 hover:underline">
          Privacy Policy
        </a>{" "}
        |
        <a href="/terms-of-service" className="text-gray-400 hover:underline">
          Terms of Service
        </a>
      </div>
    </footer>
  );
}
