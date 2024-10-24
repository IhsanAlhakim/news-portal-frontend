export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 text-center mt-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold">IHSAN ALHAKIM</span>. All Rights Reserved.
      </p>
    </footer>
  );
}
