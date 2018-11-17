import { Users as UserModel } from '../models/users'
import { Favorites as FavoritesModel } from '../models/favorites'
import { handleError, handleResponse } from './requestHelpers'


export const updateUser = async(id, username, email, password, res) => {
    try {
        const update = await UserModel.findByIdAndUpdate({ id }, { username, email }, { new: true });
        if (password) {
            try {
                await update.setPassword(password);
                try {
                    await update.save();
                    handleResponse(true, 'User updated', update, 200, res);
                }
                catch (err) {
                    handleError(err, 500, 'ERROR SAVING AFTER PASSWORD CHANGE', 'Passport', res);
                }
            }
            catch (err) {
                handleError(err, 500, 'ERROR SETTING CHANGED PASSWORD', 'Passport', res);
            }
        }
        else {
            try {
                await update.save();
                handleResponse(true, 'User updated', update, 200, res);
            }
            catch (err) {
                handleError(err, 500, 'ERROR UPDATING USER', 'Passport', res);
            }
        }
    }
    catch (err) {
        handleError(err, 500, 'MONGO FAILED TO FIND AND UPDATE USER', 'Mongo', res);
    }
}

export const updateFavorite = async(id, title) => {
    try {
        const updated = await FavoritesModel.findByIdAndUpdate(id, { title }, { new: true })
        try {
            await updated.save()
            handleResponse(true, 'Favorite updated', updated, 200, res)
        }
        catch(err){
            handleError(err, 500, 'COULD NOT SAVE UPDATED FAVORITE', 'Passport', res)
        }
    }
    catch(err){
        handleError(err, 500, 'FAILED TO FIND FAVORITE BY ID', 'Mongo', res)
    }
}