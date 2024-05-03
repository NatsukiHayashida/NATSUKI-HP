import { Button } from '@/components/ui/button'; // 独自のButtonコンポーネントをインポート

export default function Contact() {
  return (
    <div className="container mx-auto px-16 ">{/* ここでX方向の中央揃え */}
      <div className='mt-4 mb-12'>
        <h1 className="text-3xl text-center  m-2 ">Contact Us</h1>
        <p className='text-center text-muted-foreground'>
          Please fill this form in a decent manner.
        </p>
      </div>
      <form method="post" action="https://natsuki-hp.form.newt.so/v1/jAuz6cZim" className="max-w-xl m-auto my-4 px-16">
{/* ここでフォーム自体もX方向の中央揃え */}
        <div className="mb-8">
          <label htmlFor="name" className="block  text-sm font-medium ">Name</label>
          <input
            type="text"
            id="name"
            name="Full name"
            className="mt-2 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none  sm:text-sm"
            required
          />
        </div>
        <div className="mb-8">
          <label htmlFor="email" className="block  text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="Email"
            className="mt-2 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm"
            required
          />
        </div>
        <div className="my-6">
          <label htmlFor="message" className="block  text-sm font-medium">Message</label>
          <textarea
            id="message"
            name="Message"
            rows={6}
            className="mt-2 block w-full px-3 py-2 border rounded-md focus:outline-none shadow-sm sm:text-sm"
            required
          ></textarea>
        </div>
        <div className="flex justify-center"> {/* ボタンをX方向の中央配置 */}
          <Button type="submit" variant="default" className="py-2 px-4 border rounded-md shadow-sm text-sm font-medium">
            送信
          </Button>
        </div>
      </form>
    </div>
  );
}
