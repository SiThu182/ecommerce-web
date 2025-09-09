import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
    username: string;
    email: string;
    phone: string;
    image: File | null;
}

const ProfileDetails: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [image, setImage] = useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const onSubmit: SubmitHandler<FormData> = data => {
        console.log(data);
        // Handle form submission logic here
    };

    return (
        <div className="flex space-x-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-2/3">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        {...register('username', { required: 'Username is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Save
                    </button>
                </div>
            </form>
            <div className="w-1/3 flex flex-col items-center">
                <div className="w-32 h-32 mb-4">
                    <img
                        src={image ? URL.createObjectURL(image) : 'https://via.placeholder.com/150'}
                        alt="Profile Avatar"
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                    type="file"
                    id="file-upload"
                    onChange={handleImageUpload}
                    className="hidden"
                />
                <label
                    htmlFor="file-upload"
                    className="mt-1 block w-full text-sm text-gray-500 cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                >
                    Select Image
                </label>
            </div>
        </div>
    );
};

export default ProfileDetails;