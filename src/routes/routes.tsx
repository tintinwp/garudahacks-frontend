import MainLayout from '@/components/main-layout'
import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Page404 from '@/pages/errors/404'
import { MAIN_ROUTES } from '../datas/route'

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

