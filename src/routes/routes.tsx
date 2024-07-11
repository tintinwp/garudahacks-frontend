import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MAIN_ROUTES } from '../datas/route.tsx'
import MainLayout from '@/layouts/main-layout'
import Page404 from '@/pages/404-page.tsx'

export default function Routing() {
  return (
      <Suspense>
        <Routes>
            {MAIN_ROUTES.map((route) => (
              <Route  path={route.link} element={<MainLayout>{route.component}</MainLayout>} key={route.link as string} />
            ))}
          <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  )
}

