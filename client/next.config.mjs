/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "workzen-images.s3.amazonaws.com",
                port: "",
                pathname: "/**",
            }
        ]
    }
};

export default nextConfig;
