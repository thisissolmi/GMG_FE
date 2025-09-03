export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            GMG 즉행 로그인
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            여행 계획을 시작해보세요
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
