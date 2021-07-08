import { RequestHandler } from 'express';
import { User } from '../database/models/user';

export const toggleReadableFontOn: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    await User.update(
      {readable_font: true},
      {where: { id }}
    );
    res.status(200).send('readableFont toggled on');
  } catch (err) {
    console.log('error updating readableFont to on: ', err);
    res.sendStatus(500);
  }
};

export const toggleReadableFontOff: RequestHandler<{ id: string }> = async (
  req,
  res
) => {
  try {
    const { id } = req.params;
    await User.update(
      {readable_font: false},
      {where: { id }}
    );
    res.status(200).send('readableFont toggled off');
  } catch (err) {
    console.log('error updating readableFont to off: ', err);
    res.sendStatus(500);
  }
};