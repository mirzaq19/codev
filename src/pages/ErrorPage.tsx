import ErrorInfo from '@/components/content/ErrorInfo';

function ErrorPage() {
  return (
    <div className="min-h-main flex flex-col justify-center items-center">
      <ErrorInfo
        statusCode={404}
        title="Halaman tidak ditemukan"
        desc="Halaman yang anda cari tidak ditemukan"
      />
    </div>
  );
}

export default ErrorPage;
