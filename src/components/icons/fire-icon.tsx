import { forwardRef, HTMLAttributes } from "react"

const FireIcon = forwardRef<SVGSVGElement, HTMLAttributes<HTMLOrSVGElement>>(({...props}, ref) => {
  return (
    <svg ref={ref} {...props} width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_6_20)">
      <path d="M10.0013 11.4553C9.84098 13.1653 9.72848 16.1916 10.7382 17.4797C10.7382 17.4797 10.2629 14.1553 14.5238 9.98441C16.2394 8.30535 16.636 6.0216 16.0369 4.30878C15.6966 3.33847 15.075 2.53691 14.535 1.97722C14.22 1.64816 14.4619 1.10535 14.9204 1.12503C17.6935 1.24878 22.1879 2.01941 24.0975 6.81191C24.9357 8.91566 24.9975 11.0897 24.5982 13.3003C24.345 14.7122 23.445 17.851 25.4982 18.2363C26.9635 18.5119 27.6722 17.3475 27.99 16.5094C28.1222 16.1607 28.5807 16.0735 28.8282 16.3519C31.3032 19.1672 31.5141 22.4832 31.0022 25.3378C30.0122 30.856 24.4238 34.8722 18.8719 34.8722C11.9363 34.8722 6.41536 30.9038 4.98379 23.7207C4.40723 20.821 4.69973 15.0835 9.17161 11.0335C9.50348 10.7297 10.0463 10.9997 10.0013 11.4553Z" fill="url(#paint0_radial_6_20)" stroke="white" strokeWidth="2.34375"/>
      <path d="M21.4061 21.7743C18.8496 18.4837 19.9943 14.729 20.6214 13.2328C20.7058 13.0359 20.4808 12.8503 20.3036 12.9712C19.2039 13.7193 16.9511 15.4799 15.9021 17.9578C14.4818 21.3074 14.583 22.9471 15.4239 24.9496C15.9302 26.1562 15.3424 26.4121 15.0471 26.4571C14.7602 26.5021 14.4958 26.3109 14.2849 26.1112C13.678 25.5286 13.2456 24.7884 13.0361 23.9737C12.9911 23.7993 12.7633 23.7515 12.6593 23.8949C11.8718 24.9834 11.4639 26.7299 11.4443 27.9646C11.3824 31.7812 14.5352 34.8749 18.3489 34.8749C23.1555 34.8749 26.6571 29.5593 23.8952 25.1156C23.0936 23.8218 22.3399 22.9753 21.4061 21.7743Z" fill="url(#paint1_radial_6_20)" stroke="white" strokeWidth="0.1875"/>
      </g>
      <defs>
      <radialGradient id="paint0_radial_6_20" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.4982 34.9597) rotate(-179.751) scale(19.8528 32.5744)">
      <stop offset="0.314" stopColor="#FF9800"/>
      <stop offset="0.662" stopColor="#FF6D00"/>
      <stop offset="0.972" stopColor="#F44336"/>
      </radialGradient>
      <radialGradient id="paint1_radial_6_20" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(18.6133 15.2039) rotate(90.5787) scale(20.7721 15.6326)">
      <stop offset="0.214" stopColor="#FFF176"/>
      <stop offset="0.328" stopColor="#FFF27D"/>
      <stop offset="0.487" stopColor="#FFF48F"/>
      <stop offset="0.672" stopColor="#FFF7AD"/>
      <stop offset="0.793" stopColor="#FFF9C4"/>
      <stop offset="0.822" stopColor="#FFF8BD" stopOpacity="0.804"/>
      <stop offset="0.863" stopColor="#FFF6AB" stopOpacity="0.529"/>
      <stop offset="0.91" stopColor="#FFF38D" stopOpacity="0.209"/>
      <stop offset="0.941" stopColor="#FFF176" stopOpacity="0"/>
      </radialGradient>
      <clipPath id="clip0_6_20">
      <rect width="36" height="36" fill="white"/>
      </clipPath>
      </defs>
    </svg>
  )
})


export default FireIcon;